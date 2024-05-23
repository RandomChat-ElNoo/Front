import styled, { keyframes } from 'styled-components';

const DotAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

const Container = styled.div<ContainerProps>`
  max-width: 48rem;
  width: 3.7rem;
  min-height: 4rem;
  padding: 1.5rem 0.7rem;
  margin-bottom: 1.2rem;

  background-color: ${props => (props.isMine ? '#E2A5FF' : '#5CB1FF')};
  border-radius: 1rem;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
`;

const FlexBox = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${props => (props.isMine ? 'right' : 'left')};
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  animation: ${DotAnimation} 1.5s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.25s;
  }

  &:nth-child(3) {
    animation-delay: 0.5s;
  }

  &:nth-child(4) {
    animation-delay: 0.75s;
  }
`;

interface ContainerProps {
  isMine: boolean;
}

export default function Typing() {
  return (
    <>
      <FlexBox isMine={false}>
        <Container isMine={false}>
          <DotsContainer>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
          </DotsContainer>
        </Container>
      </FlexBox>
    </>
  );
}
