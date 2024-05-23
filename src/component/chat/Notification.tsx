import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.2rem;

  @media (max-width: 520px) {
    padding: 0rem 1rem;
  }
`;

const Notifications = styled.div`
  max-width: 96rem;
  min-width: 19rem;
  width: 100%;
  height: 3rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.5);

  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 3rem;
  font-family: Pretendard Variable;
`;

const ReMatching = styled.button`
  width: 12rem;
  height: 3rem;
  padding: 0rem 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.5);

  color: #000;

  font-size: 1.5rem;
  font-weight: 500;
  line-height: 3rem;
  font-family: Pretendard Variable;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
  &:active {
    background: rgba(240, 240, 240, 0.7);
  }
`;

interface NotificationProps {
  type: 'connect' | 'disConnect';
  rematching?: () => void;
}
export default function Notification({ type, rematching }: NotificationProps) {
  return (
    <>
      <Container>
        <Notifications>
          {type === 'connect'
            ? '상대방과 연결되었습니다!'
            : '상대방이 퇴장하였습니다.'}
        </Notifications>
        {type === 'connect' ? (
          ''
        ) : (
          <ReMatching onClick={rematching}>
            재매칭 <img alt="재매칭" src="/Imgs/rematching.svg" />
          </ReMatching>
        )}
      </Container>
    </>
  );
}
