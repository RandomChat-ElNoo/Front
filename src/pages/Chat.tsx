import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import {
//   socket,
//   socketJoin,
//   socketExit,
//   socketCount,
//   socketChat,
//   socketAvatar,
//   SocketIoAvaliableEventRecord,
// } from '../utils/soket';
import OwnAvatar from '../component/chat/OwnAvatar';
import ExitButton from '../component/chat/ExitButton';
import Notification from '../component/chat/Notification';
import ChatBox from '../component/chat/ChatBox';
import ChatInput from '../component/chat/ChatInput';
import Typing from '../component/chat/Typing';
import Loading from '../component/chat/Loading';
import RematchingModal from '../component/chat/RematchingModal';
import usePrevious from '../hooks/usePrevAction';
import usePreventRefresh from '../hooks/usePreventRefresh';

const Background = styled.div`
  height: 100%;
  height: 100vh;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatContainer = styled.div`
  max-width: 100rem;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  background: rgba(255, 255, 255, 0.25);
`;

const ExitFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding: 0 2rem 2rem 2rem;
`;

const Chattings = styled.div`
  height: calc(100% - 25rem);
  padding: 0 2rem 0 2rem;
  overflow-y: auto;
`;

type Action = 'join' | 'exit' | 'wait' | '';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

export const worker = new Worker(
  new URL('../utils/worker.js', import.meta.url),
);

export default function Chat() {
  const [connected, setConnected] = useState(false);
  const [actionState, setActionState] = useState<Action>('');
  const [clientCount, setClientCount] = useState<number | '  '>('  ');
  const [avatar, setAvatar] = useState('');
  const [chatInputValue, setChatInputValue] = useState<string>('');
  const [chattings, setChattings] = useState<(string | boolean)[][]>([]);
  const [countdown, setCountdown] = useState(2);
  const [isTyping, setIsTyping] = useState(false);
  const [isRematchModal, setIsRematchingModal] = useState(false);
  const [isMatching, setIsMatching] = useState(true);
  const [isInputDisable, setIsInputDisable] = useState(true);

  const timeoutRef = useRef<number | undefined>(undefined);
  const matchingTimeoutRef = useRef<number | undefined>(undefined);
  const scrollRef = useRef<any>();
  const prevAct = usePrevious(actionState);

  usePreventRefresh();

  const handleJoin = () => {
    // socketJoin();
    worker.postMessage({ action: 'join', data: undefined });
    setConnected(false);
    setChattings([]);
  };

  const handleExit = () => {
    // socketExit();
    worker.postMessage({ action: 'exit', data: undefined });
  };

  const handleEnter = () => {
    if (chatInputValue.length > 0) {
      const a = [...chattings, [chatInputValue, true]];
      setChattings(a);
      // socketChat(chatInputValue);
      worker.postMessage({ action: 'message', data: chatInputValue });
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const handleStartTypingTimeout = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
    }, countdown * 1000);
  };

  const handleRestart = () => {
    clearTimeout(timeoutRef.current);
    setIsTyping(true);
    setCountdown(2);
    handleStartTypingTimeout();
  };

  const handleStartMatchingTimeout = () => {
    matchingTimeoutRef.current = window.setTimeout(() => {
      setIsRematchingModal(true);
      // socketExit();
      worker.postMessage({ action: 'exit', data: undefined });
    }, 60 * 1000);
  };

  const handleClearMatchingTimeout = () => {
    clearTimeout(matchingTimeoutRef.current);
  };
  const handleFirstJoin = () => {
    worker.postMessage({ action: 'join', data: undefined });
  };
  useEffect(() => {
    // handleJoin();
    handleFirstJoin();

    let isCooldown = false;
    let interval = -1;
    const sendCountDealyed = () => {
      if (isCooldown) {
        return;
      }
      isCooldown = true;
      interval = window.setTimeout(() => {
        isCooldown = false;
        // socketCount();
        worker.postMessage({ action: 'count', data: undefined });
      }, 1500);
    };

    const handleMessage = (msg: string) => {
      if (msg !== 'Unable to send message, not joined.') {
        setChattings(prevMsg => [...prevMsg, [msg, false]]);
        setIsTyping(false);
        window.scrollTo(0, document.body.scrollHeight);
      }
    };
    // SocketIoAvaliableEventRecord['action']
    const handleAction = (response: any) => {
      if (['join', 'exit', 'wait'].includes(response.action)) {
        setActionState(response.action as Action);
      }
      switch (response.action) {
        case 'join':
          setConnected(true);
          setIsMatching(false);
          // socketAvatar(localStorage.getItem('avatar'));
          worker.postMessage({
            action: 'avatar',
            data: localStorage.getItem('avatar'),
          });
          clearTimeout(interval);
          handleClearMatchingTimeout();
          setIsInputDisable(false);
          break;
        case 'exit':
          clearTimeout(interval);
          setChatInputValue('');
          setIsInputDisable(true);
          break;
        case 'wait':
          setIsMatching(true);
          sendCountDealyed();
          handleStartMatchingTimeout();
          break;
        case 'count':
          sendCountDealyed();
          setClientCount(response.data - 1);
          break;
        case 'avatar':
          setAvatar(response.data);
          break;
        case 'typeing':
          handleRestart();
          break;
      }
    };

    // socket.on('action', handleAction);
    // socket.on('message', handleMessage);
    worker.onmessage = (e: any) => {
      const { action } = e.data;
      if (action) {
        handleAction(e.data);
      } else {
        handleMessage(e.data);
      }
    };
    return () => {
      // socket.off('action', handleAction);
      // socket.off('message', handleMessage);
      // worker.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevAct === 'wait' && actionState === 'exit') {
      setIsRematchingModal(true);
    }
    if (prevAct === 'join' && actionState === 'exit') {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [actionState, prevAct]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chattings, isTyping]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'visible') {
  //       console.log('현재 탭이 활성화되었습니다.');
  //     } else {
  //       console.log('현재 탭이 비활성화되었습니다.');
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);

  return (
    <>
      <Background>
        <ChatContainer>
          <ExitFlex>
            <ExitButton onClickFunc={handleExit} />
          </ExitFlex>
          <OwnAvatar
            yourAvatar={avatar ? avatar : '??'}
            myAvatar={
              localStorage.getItem('avatar')
                ? localStorage.getItem('avatar')
                : '기타'
            }
            key={'Avatars'}
          />
          <Chattings ref={scrollRef}>
            {connected ? <Notification type="connect" key="connect" /> : ''}
            {chattings.map((item: any, index: number) => (
              <>
                <ChatBox
                  content={item[0]}
                  isMine={item[1]}
                  key={`채팅-${index}`}
                />
              </>
            ))}
            {isTyping ? <Typing /> : ''}
            {actionState === 'exit' ? (
              <Notification
                type="disConnect"
                rematching={handleJoin}
                key="disconnect"
              />
            ) : (
              ''
            )}
          </Chattings>
          <ChatInput
            onPressEnter={handleEnter}
            InputValue={chatInputValue}
            chatInputSetter={setChatInputValue}
            disabled={isInputDisable}
          />
        </ChatContainer>
        {isMatching ? <Loading clientCount={clientCount} /> : ''}
        <RematchingModal open={isRematchModal} setter={setIsRematchingModal} />
      </Background>
    </>
  );
}
