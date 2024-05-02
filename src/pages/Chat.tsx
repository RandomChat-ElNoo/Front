import styled from 'styled-components';
import OwnAvatar from '../component/OwnAvatar';
import ExitButton from '../component/ExitButton';
import Notification from '../component/Notification';
import ChatBox from '../component/ChatBox';
import ChatInput from '../component/ChatInput';

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
export default function Chat() {
  return (
    <>
      <Background>
        <ChatContainer>
          <ExitFlex>
            <ExitButton onClickFunc={() => {}} />
          </ExitFlex>
          <OwnAvatar yourAvatar="일이삼사오육칠팔구십" myAvatar="키쿄" />
          <Chattings>
            <Notification type="connect" />
            <ChatBox content="안녕하세요" isMine={false} />
            <ChatBox content="반가워요" isMine={true} />
            <ChatBox content="짧은글 몇개 적어보기" isMine={false} />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={false}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />

            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />
            <ChatBox
              content="당신이 맡은 새로운 프로젝트는 혁신적인 아이디어를 담고 있습니다. 이 프로젝트는 사람들의 삶을 더 나아지게 만들고, 사회에 긍정적인 영향을 끼치는 것을 목표로 합니다.
            "
              isMine={true}
            />

            <Notification type="disConnect" />
          </Chattings>
          <ChatInput />
        </ChatContainer>
      </Background>
    </>
  );
}
