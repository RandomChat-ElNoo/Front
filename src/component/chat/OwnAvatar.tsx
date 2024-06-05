import { useEffect, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 0 4rem 2rem 4rem;

  @media (max-width: 520px) {
    padding: 0 0.1rem 2rem 0.1rem;
    gap: 0.1rem;
  }
`;
const Container = styled.div<ShirinkProps>`
  max-width: 44rem;
  width: 100%;
  height: 8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.5);

  animation: ${({ shirink }) =>
    shirink
      ? 'containerAniShrink 0.1s forwards'
      : 'containerAniExpand 0.1s forwards'};

  @media (max-width: 520px) {
    /* min-width: calc(20rem - 0.3rem); */
  }

  @keyframes containerAniShrink {
    from {
      height: 8rem;
    }
    to {
      height: 0;
    }
  }

  @keyframes containerAniExpand {
    from {
      height: 0;
    }
    to {
      height: 8rem;
    }
  }
`;

const Text = styled.p<ShirinkProps>`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  font-family: Pretendard Variable;
  line-height: 3rem;

  animation: ${({ shirink }) =>
    shirink ? 'textAniShrink 0.1s forwards' : 'textAniExpand 0.1s forwards'};

  @keyframes textAniShrink {
    from {
      transform: scaleY(1);
      opacity: 1;
    }
    to {
      transform: scaleY(0);
      opacity: 0;
    }
  }

  @keyframes textAniExpand {
    from {
      transform: scaleY(0);
      opacity: 0;
    }
    to {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

interface ShirinkProps {
  shirink: boolean;
}

interface OwnAvatarProps {
  yourAvatar: string;
  myAvatar: string | null;
  isInputFocused: boolean;
}
export default function OwnAvatar({
  yourAvatar,
  myAvatar,
  isInputFocused,
}: OwnAvatarProps) {
  const [shirink, setShirink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 520) {
        setIsMobile(true);
        console.log('setIsMobile', true);
      } else {
        setIsMobile(false);
        console.log('setIsMobile', false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const checking = () => {
      if (isMobile && isInputFocused) {
        setShirink(true);
      } else {
        setShirink(false);
      }
    };
    checking();
  }, [isInputFocused, isMobile]);

  console.table({
    isInputFocused: isInputFocused,
    isMobile: isMobile,
    shirink: shirink,
  });

  //여기부터해야하고 모바일값내려줘서 작업하면 됨
  return (
    <MainContainer key={'AvatarContainer'}>
      <Container shirink={shirink} key={'yourAvatar'}>
        <Text shirink={shirink}>상대</Text>
        <Text shirink={shirink}>{yourAvatar}</Text>
      </Container>
      <Container shirink={shirink} key={'ownAvatar'}>
        <Text shirink={shirink}>나</Text>
        <Text shirink={shirink}>{myAvatar}</Text>
      </Container>
    </MainContainer>
  );
}
