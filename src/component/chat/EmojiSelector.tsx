import { Dispatch, SetStateAction, MutableRefObject, useEffect } from 'react';
import { SmileFilled, SmileOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { worker } from '../../pages/Chat';

const Container = styled.div`
  max-height: 19rem;
  overflow-x: none;
  /* overflow-y: scroll; */
`;

const EmojiContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const ImgContainer = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: fill;
  }
  :hover {
    background-color: #ededed;
  }
`;

interface EmojiSelectorProps {
  setChattings: Dispatch<SetStateAction<(string | boolean)[][]>>;
  backgroundRef: MutableRefObject<HTMLDivElement | null>;
  disabled: boolean;
}
export default function EmojiSelector({
  setChattings,
  backgroundRef,
  disabled,
}: EmojiSelectorProps) {
  const [popover, setPopover] = useState(false);

  const emojis = ['Hello', 'Bye', 'LOL', 'Angry', 'Dizzy', 'FreakOut'];

  const handleClickEmojiButton = () => {
    if (!disabled) {
      setPopover(prev => !prev);
    }
  };

  const handleSendEmoji = (emoji: string) => {
    setChattings(prevMsg => [...prevMsg, [`:${emoji}:`, true]]);
    setPopover(false);
    worker.postMessage({ action: 'message', data: `:${emoji}:` });
  };
  const content = (
    <>
      <Container>
        <EmojiContainer>
          {emojis.map((item, index) => (
            <ImgContainer
              key={`emoji-${index}`}
              onClick={() => handleSendEmoji(item)}
            >
              <img
                src={`/Emojis/${item}.svg`}
                alt="이모지선택"
                loading="eager"
              />
            </ImgContainer>
          ))}
        </EmojiContainer>
      </Container>
    </>
  );

  useEffect(() => {
    const handleClickBackground = () => {
      setPopover(false);
    };
    const ref = backgroundRef.current;

    if (ref) {
      ref.addEventListener('click', handleClickBackground);
    }
    return () => {
      if (ref) {
        ref?.removeEventListener('click', handleClickBackground);
      }
    };
  }, [backgroundRef]);

  useEffect(() => {
    if (disabled) {
      setPopover(false);
    }
  }, [disabled]);

  return (
    <>
      <Popover content={content} trigger="click" open={popover}>
        {popover ? (
          <SmileFilled
            onClick={handleClickEmojiButton}
            style={{ fontSize: '30px', color: 'rgba(91, 33, 255, 1)' }}
          />
        ) : (
          <SmileOutlined
            onClick={handleClickEmojiButton}
            style={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.45)' }}
          />
        )}
      </Popover>
    </>
  );
}
