import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, ConfigProvider, Input } from 'antd';
import AskModal from '../component/AskModal';
import { Link } from 'react-router-dom';
import { socketExit } from '../utils/soket';

const Background = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;

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
  const [avatarInputValue, setAvatarInputValue] = useState('');

  const handleAvatarInput = (e: any) => {
    setAvatarInputValue(e.target.value);
  };

  const handleAvatarSave = () => {
    localStorage.setItem('avatar', avatarInputValue);
  };

  const handleStartChatting = () => {
    handleAvatarSave();
    console.log(localStorage.getItem('avatar'));
  };

  const handleModal = () => {
    setModal(true);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const suffix = (
    <>
      <Link to={'/chat'}>
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
      </Link>
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
              onChange={handleAvatarInput}
              value={avatarInputValue}
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
        </Background>
      </ConfigProvider>
    </>
  );
}

// const action = ['join', 'exit', 'typing', 'avatar', 'count'];
// "message"

// chat 페이지로 링크 바로 입력하면 메인 페이지로 reroute
// 엔터눌렀을때 연결되도록

/*
1. 아바타 적고 버튼누르면
(로컬스토리지에 아바타 저장**, 액션 join 보내고 로딩창 뜨면서 count 1초에 한번 보내고**
액션값 join이 들어오면 chat페이지로 이동하면서 avatar액션보내기)
2. 채팅 칠때****
(typing 액션 보내기, 엔터 치면 message로 인풋 보내기 그리고 채팅 객체에 .push )
3. 상대가 칠때*****
(typing 값이 들어오면 4초간 유지, 그 후 들어올때마다 타이머초기화)
4. 나가기****
(매인페이지로 나가고 액션에 exit 값 보내기)
5. 상대가 나가고 재매칭 누르면
(로딩창 띄우고 액션 join 보내고 로딩창 뜨면서 count 1초에 한번 보내고
채팅 객체 리셋하고 avatar 액션보내기)
*/
//https://velog.io/@fejigu/Socket.IO-client
//https://velog.io/@fromjjong/React-socket.io%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EA%B8%B0%EB%8A%A5-1-%EC%A0%95%EC%9D%98-namespace-%EA%B8%B0%EB%B3%B8-%EC%84%B8%ED%8C%85
