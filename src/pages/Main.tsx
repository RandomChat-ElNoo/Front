import { Button, ConfigProvider, Input } from 'antd';
import styled from 'styled-components';
import Loading from '../component/Loading';

const Background = styled.div`
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: linear-gradient(
      72deg,
      rgba(255, 255, 255, 0.01) 2%,
      rgba(0, 102, 255, 0.7) 100%
    ),
    #e2a5ff;
`;

const Container = styled.div`
  max-width: 60rem;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
`;

const Banner = styled.div`
  width: 100%;
  padding: 15rem 0 1.7rem 0;
  margin-bottom: 4rem;
  border-bottom: 0.4rem solid #000;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 2.2rem;
`;

const inputStyle = {
  width: '100%',
  height: '4rem',
  padding: '0 0.4rem 0 2rem',
  borderRadius: '2rem',
  fontFamily: 'Pretendard',
  fontWeight: '500',
};

export default function Main() {
  const suffix = (
    <Button
      style={{
        height: '3.4rem',
        padding: '1rem',
        borderRadius: '2rem',
        background: 'rgba(91, 33, 255, 1)',
        display: 'Flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e8e8e8',
      }}
      onClick={() => {}}
    >
      채팅하러가기
    </Button>
  );
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              inputFontSize: 15,
              fontFamily: 'Pretendard',
            },
          },
        }}
      >
        <Background>
          <Container>
            <Banner>
              <img alt="배너이미지" src="/Imgs/titleOfRC.svg" />
            </Banner>
            <Text>VRChat 유저들을 위한 랜덤채팅</Text>
            <Input
              placeholder="사용하시는 아바타를 적어주세요 예) 마누카, 모에"
              showCount
              maxLength={10}
              style={inputStyle}
              suffix={suffix}
            />
          </Container>
          {/* <Loading clientCount={15} /> */}
        </Background>
      </ConfigProvider>
    </>
  );
}
