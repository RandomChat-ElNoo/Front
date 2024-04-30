import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 0 4rem 2rem 4rem;
  @media (max-width: 520px) {
    padding: 0 2rem 2rem 2rem;
    gap: 2rem;
  }
`;
const Container = styled.div`
  max-width: 44rem;
  min-width: 21rem;
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.5);
`;

const Text = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  font-family: Pretendard;
  line-height: 3rem;
`;
interface OwnAvatarProps {
  yourAvatar: string;
  myAvatar: string;
}
export default function OwnAvatar({ yourAvatar, myAvatar }: OwnAvatarProps) {
  return (
    <MainContainer>
      <Container>
        <Text>상대</Text>
        <Text>{yourAvatar}</Text>
      </Container>
      <Container>
        <Text>나</Text>
        <Text>{myAvatar}</Text>
      </Container>
    </MainContainer>
  );
}
