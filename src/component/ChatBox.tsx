import styled from 'styled-components';

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
}
export default function ChatBox({ content, isMine }: ChatProps) {
  return (
    <>
      <FlexBox isMine={isMine}>
        <Container isMine={isMine}>{content}</Container>
      </FlexBox>
    </>
  );
}
