import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, ConfigProvider, Input } from 'antd';
import Loading from '../component/Loading';
import AskModal from '../component/AskModal';

const Background = styled.div`
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

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
  position: relative;
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
  line-height: 3rem;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Ask = styled.button`
  width: fit-content;
  height: fit-content;
  margin-top: 15rem;
  background-color: rgba(0, 0, 0, 0);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4rem;
`;

const ImgContainer = styled.div`
  width: 5rem;
  height: 5rem;
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modal, setModal] = useState(false);
  const [askInputValue, setAskInputValue] = useState('');

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

  // function sendEmail() {
  //   window.location.href =
  //     'mailto:tofhdnsgksk@gmail.com?subject=Subject&body=Body';
  // }

  const handleModal = () => {
    setModal(true);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log(askInputValue);
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
          <AskModal
            setValue={setAskInputValue}
            open={modal}
            setter={setModal}
            inputValue={askInputValue}
          />
          <Container>
            <Banner>
              {windowWidth >= 420 ? (
                <img alt="배너이미지" src="/Imgs/titleOfRC.svg" />
              ) : (
                <img alt="배너이미지" src="/Imgs/titleOfRCsmall.svg" />
              )}
            </Banner>
            {windowWidth >= 420 ? (
              <Text>VRChat 유저들을 위한 랜덤채팅</Text>
            ) : (
              <>
                <Text>
                  VRChat 유저들을 위한
                  <br />
                  랜덤채팅
                </Text>
              </>
            )}
            <Input
              placeholder="사용하시는 아바타를 적어주세요 예) 마누카, 모에"
              showCount
              maxLength={10}
              style={inputStyle}
              suffix={suffix}
            />
            <FlexContainer>
              <Ask onClick={handleModal}>
                <ImgContainer>
                  <img alt="문의하기" src="/Imgs/VRC_icon.svg" />
                </ImgContainer>
                {/* <p>피드백
                  문의하기</p> */}
              </Ask>
            </FlexContainer>
          </Container>
          {/* <Loading clientCount={15} /> */}
        </Background>
      </ConfigProvider>
    </>
  );
}
