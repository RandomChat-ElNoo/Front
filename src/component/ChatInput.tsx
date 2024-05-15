import { CaretRightOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input } from 'antd';
import styled from 'styled-components';
import { socketTyping } from '../utils/soket';
const InputContainer = styled.div`
  padding: 1rem 2rem 2rem 2rem;
`;
const inputStyle = {
  width: '100%',
  height: '4rem',
  fontSize: '1.6rem',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  padding: '0.5rem 0.5rem 0.5rem 2rem',
  borderRadius: '2rem',
};
interface ChatInputProps {
  onPressEnter: () => void;

  InputValue: string;
  chatInputSetter: (value: string) => void;
  disabled: boolean;
}

export default function ChatInput({
  onPressEnter,
  InputValue,
  chatInputSetter,
  disabled,
}: ChatInputProps) {
  const handleInputValue = (e: any) => {
    chatInputSetter(e.target.value);
    socketTyping();
  };

  const handleSendMessage = () => {
    onPressEnter();
    chatInputSetter('');
  };

  const suffix = (
    <Button
      style={{
        width: '3.4rem',
        height: '3.4rem',
        padding: '0 0 0 0.1rem',
        borderRadius: '50%',
        background: 'rgba(91, 33, 255, 1)',
        display: 'Flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleSendMessage}
      disabled={disabled}
    >
      <CaretRightOutlined style={{ fontSize: '2rem' }} />
    </Button>
  );

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: { defaultHoverColor: 'black', defaultActiveColor: 'white' },
          },
        }}
      >
        <InputContainer>
          <Input
            onPressEnter={handleSendMessage}
            value={InputValue}
            onChange={handleInputValue}
            showCount
            allowClear
            maxLength={300}
            suffix={suffix}
            style={inputStyle}
            disabled={disabled}
          />
        </InputContainer>
      </ConfigProvider>
    </>
  );
}
