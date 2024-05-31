import { useEffect, useState, MutableRefObject } from 'react';
import styled from 'styled-components';
import ReplaceUrl from './ReplaceUrl';
import Emojis from './Emojis';

const Container = styled.div.withConfig({
  shouldForwardProp: prop => ['isMine', 'children'].includes(prop),
})<ContainerProps>`
  max-width: 48rem;
  width: max-content;
  min-height: 4rem;
  padding: 1rem;
  margin-bottom: 1.2rem;

  background-color: ${props => (props.isMine ? '#E2A5FF' : '#5CB1FF')};
  border-radius: 1rem;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  word-wrap: break-word;
  word-break: break-all;
`;

const FlexBox = styled.div.withConfig({
  shouldForwardProp: prop => ['isMine', 'children'].includes(prop),
})<ContainerProps>`
  display: flex;
  justify-content: ${props => (props.isMine ? 'right' : 'left')};
`;

interface ContainerProps {
  isMine: boolean;
}
interface ChatProps {
  content: string;
  isMine: boolean;
  scrollRef: MutableRefObject<HTMLDivElement | null>;
}
export default function ChatBox({ content, isMine, scrollRef }: ChatProps) {
  const [isEmoji, setIsEmoji] = useState<boolean>(false);

  useEffect(() => {
    const emojiReg = /:Angry:|:Dizzy:|:FreakOut:|:LOL:|:Bye:|:Hello:/;
    const test = emojiReg.test(content);
    setIsEmoji(test);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content, scrollRef]);

  useEffect(() => {}, [isEmoji]);

  return (
    <>
      <FlexBox isMine={isMine}>
        <Container isMine={isMine}>
          {isEmoji ? (
            <Emojis content={content} scrollRef={scrollRef} />
          ) : (
            <ReplaceUrl text={content} />
          )}
        </Container>
      </FlexBox>
    </>
  );
}
