import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 60rem;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  position: relative;
`;

const Banner = styled.div`
  width: 100%;
  padding: 15rem 0 1.7rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 0.4rem solid #000;

  display: flex;
  justify-content: start;

  @media (max-width: 420px) {
    padding: 7rem 0 1.7rem 0;
  }
`;

const Text = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 3rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export default function Dev() {
  return (
    <>
      <Background>
        <Container>
          <FlexContainer>
            <Banner>
              <img alt="배너이미지" src="/Imgs/titleOfRCsmall.svg" />
            </Banner>
          </FlexContainer>
          <Text>더나은 모습으로 찾아뵙겠습니다~</Text>
        </Container>
      </Background>
    </>
  );
}
