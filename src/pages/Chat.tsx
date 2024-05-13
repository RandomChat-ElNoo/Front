import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  socket,
  socketJoin,
  socketExit,
  socketCount,
  socketChat,
  socketAvatar,
  SocketIoAvaliableEventRecord,
} from '../utils/soket';
import OwnAvatar from '../component/OwnAvatar';
import ExitButton from '../component/ExitButton';
import Notification from '../component/Notification';
import ChatBox from '../component/ChatBox';
import ChatInput from '../component/ChatInput';
import Typing from '../component/Typing';
import Loading from '../component/Loading';
import RematchingModal from '../component/RematchingModal';

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

export default function Chat() {
  const [connected, setConnected] = useState(false);
  const [rematchModal, setRematchModal] = useState(false);
  const [actionState, setActionState] = useState<Action>('');
  const [clientCount, setClientCount] = useState<number | '  '>('  ');
  const [avatar, setAvatar] = useState('');
  const [chatInputValue, setChatInputValue] = useState<string>('');
  const [chattings, setChattings] = useState<(string | boolean)[][]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const timeoutRef = useRef<number | undefined>(undefined);
  const matchingTimeoutRef = useRef<number | undefined>(undefined);
  const scrollRef = useRef<any>();

  const handleJoin = () => {
    socketJoin();
    setConnected(false);
    setChattings([]);
  };

  const handleExit = () => {
    socketExit();
  };

  const handleEnter = () => {
    if (chatInputValue.length > 0) {
      const a = [...chattings, [chatInputValue, true]];
      setChattings(a);
      socketChat(chatInputValue);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const handleStartMatchingTimeout = () => {
    matchingTimeoutRef.current = window.setTimeout(() => {
      socketExit();
    }, 60 * 1000);
  };

  const handleClearMatchingTimeout = () => {
    clearTimeout(matchingTimeoutRef.current);
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

  useEffect(() => {
    handleJoin();

    let isCooldown = false;
    let interval = -1;
    const sendCountDealyed = () => {
      if (isCooldown) {
        return;
      }
      isCooldown = true;
      interval = window.setTimeout(() => {
        isCooldown = false;
        socketCount();
      }, 1500);
    };

    const handleMessage = (msg: string) => {
      setChattings(prevMsg => [...prevMsg, [msg, false]]);
      setIsTyping(false);
      window.scrollTo(0, document.body.scrollHeight);
    };

    const handleAction = (response: SocketIoAvaliableEventRecord['action']) => {
      if (['join', 'exit', 'wait'].includes(response.action)) {
        setActionState(response.action as Action);
      }
      switch (response.action) {
        case 'join':
          setConnected(true);
          socketAvatar(localStorage.getItem('avatar'));
          clearTimeout(interval);
          handleClearMatchingTimeout();
          break;
        case 'exit':
          clearTimeout(interval);
          break;
        case 'wait':
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
    socket.on('action', handleAction);
    socket.on('message', handleMessage);
    return () => {
      socket.off('action', handleAction);
      socket.off('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chattings, isTyping]);

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
                : '??'
            }
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
            setIsTyping={setIsTyping}
            InputValue={chatInputValue}
            setter={setChatInputValue}
          />
        </ChatContainer>
        {actionState === 'wait' ? (
          <Loading clientCount={clientCount} />
        ) : actionState === 'join' ? (
          ''
        ) : actionState === 'exit' ? (
          <>
            <Loading clientCount={clientCount} />
            <RematchingModal />
          </>
        ) : (
          ''
        )}
      </Background>
    </>
  );
}
