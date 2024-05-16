import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, ConfigProvider, Input, notification } from 'antd';
import AskModal from '../component/AskModal';
import { useNavigate } from 'react-router-dom';
import { socketExit } from '../utils/soket';

const Background = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media (max-width: 420px) {
    padding: 7rem 0 1.7rem 0;
  }
`;

const Text = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 3rem;
`;

const Text2 = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  font-size: 2rem;
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
  @media (max-width: 420px) {
    margin-top: 5rem;
  }
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
  fontFamily: 'Pretendard Variable',
  fontWeight: '500',
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Main() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modal, setModal] = useState(false);
  const [askInputValue, setAskInputValue] = useState('');
  const [avatarInputValue, setAvatarInputValue] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const navigator = useNavigate();

  const openNotificationWithIcon = (type: NotificationType, error?: string) => {
    api[type]({
      message: type === 'success' ? '보내기 완료!' : '보내기 실패',
      description: type === 'success' ? '' : error,
    });
  };

  const handleAvatarInput = (e: any) => {
    setAvatarInputValue(e.target.value);
  };

  const handleAvatarSave = () => {
    localStorage.setItem('avatar', avatarInputValue);
  };

  const handleStartChatting = () => {
    handleAvatarSave();
    navigator('/chat');
  };

  const handleModal = () => {
    setModal(true);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const suffix = (
    <>
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
        onClick={handleStartChatting}
      >
        채팅하러가기
      </Button>
    </>
  );

  useEffect(() => {
    if (localStorage.getItem('avatar') !== null) {
      const item = String(localStorage.getItem('avatar'));
      setAvatarInputValue(item);
    }

    window.addEventListener('resize', handleResize);

    socketExit();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              inputFontSize: 15,
              fontFamily: 'Pretendard Variable',
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
            openNotification={openNotificationWithIcon}
          />
          {contextHolder}
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
              onPressEnter={handleStartChatting}
              showCount
              onChange={handleAvatarInput}
              value={avatarInputValue}
              maxLength={10}
              style={inputStyle}
              suffix={suffix}
            />
            <br />
            <Text2>
              공지 : 오늘 새벽에 대화중 잠시 연결이 끊길수도 있습니다!
            </Text2>
            <FlexContainer>
              <Ask onClick={handleModal}>
                <ImgContainer>
                  <img alt="문의하기" src="/Imgs/VRC_icon.svg" />
                </ImgContainer>
              </Ask>
            </FlexContainer>
          </Container>
        </Background>
      </ConfigProvider>
    </>
  );
}
