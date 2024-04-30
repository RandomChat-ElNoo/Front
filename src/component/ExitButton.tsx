import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.button`
  display: flex;
  width: 13rem;
  height: 4rem;
  padding: 0rem 2rem 0 2rem;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  flex-shrink: 0;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.7);

  @media (max-width: 520px) {
    width: 11rem;
    gap: 0.5rem;
    padding: 0rem 1.5rem 0 1.5rem;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
  &:active {
    background: rgba(240, 240, 240, 0.7);
  }
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: 500;
  line-height: 3rem;
  font-family: Pretendard;
`;
interface ExitButtonProps {
  onClickFunc: () => void;
}

export default function ExitButton({ onClickFunc }: ExitButtonProps) {
  return (
    <>
      <Link to="/">
        <Container onClick={onClickFunc}>
          <Text>나가기</Text>
          <img alt="나가기화살표" src="/Imgs/ArrowRight.svg" />
        </Container>
      </Link>
    </>
  );
}
