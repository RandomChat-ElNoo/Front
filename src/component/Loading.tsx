import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 100%;
  padding-top: 28rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(255, 255, 255, 0.9);
  position: absolute;
`;

const TextFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Matching = styled.div`
  font-size: 5rem;
  font-weight: 400;
  line-height: 4rem;
`;

const Client = styled.div`
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 2.5rem;
`;

interface LoadingProps {
  clientCount: number;
}

export default function Loading({ clientCount }: LoadingProps) {
  return (
    <>
      <Background>
        <TextFlex>
          <Matching>매칭중</Matching>
          <Client>{clientCount}명 채팅중</Client>
          <LoadingOutlined style={{ fontSize: '15rem' }} />
        </TextFlex>
      </Background>
    </>
  );
}
