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

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
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
  const [actionState, setActionState] = useState<Action>('');
  const [clientCount, setClientCount] = useState<number | '  '>('  ');
  const [chatInputValue, setChatInputValue] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const [chattings, setChattings] = useState<(string | boolean)[][]>([]);
  const [avatar, setAvatar] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleJoin = () => {
    socketJoin();
  };

  const handleExit = () => {
    socketExit();
    localStorage.removeItem('avatar');
  };

  const handleEnter = () => {
    const a = [...chattings, [chatInputValue, true]];
    setChattings(a);
    socketChat(chatInputValue);
  };

  // const handleTyping = () => {
  //   let timerId = setTimeout(()=>{
  //     setIsTyping(false)
  //   },4000)
  //   if(!isTyping){
  //     setIsTyping(true)
  //   }
  // };
  const startTimeout = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
    }, countdown * 1000);
  };

  const handleRestart = () => {
    clearTimeout(timeoutRef.current);
    setIsTyping(true);
    setCountdown(3);
    startTimeout();
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
      }, 1000);
    };

    const handleMessage = (msg: string) => {
      console.log(msg);
      setChattings(prevMsg => [...prevMsg, [msg, false]]);
    };
    const handleAction = (response: SocketIoAvaliableEventRecord['action']) => {
      console.log('액션', response.action, '데이터', response.data);

      if (['join', 'exit', 'wait'].includes(response.action)) {
        setActionState(response.action as Action);
      }
      switch (response.action) {
        case 'join':
          setConnected(true);
          socketAvatar(localStorage.getItem('avatar'));
          clearTimeout(interval);
          break;
        case 'exit':
          break;
        case 'wait':
          sendCountDealyed();
          break;
        case 'count':
          sendCountDealyed();
          setClientCount(response.data);
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
          <Chattings>
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
              <Notification type="disConnect" key="disconnect" />
            ) : (
              ''
            )}
          </Chattings>
          <ChatInput
            onPressEnter={handleEnter}
            InputValue={chatInputValue}
            setter={setChatInputValue}
          />
        </ChatContainer>
        {actionState === 'wait' ? <Loading clientCount={clientCount} /> : ''}
      </Background>
    </>
  );
}
