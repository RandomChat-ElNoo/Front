import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import emailjs from '@emailjs/browser';
import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface AskModalProps {
  inputValue: string;
  setValue: Dispatch<SetStateAction<string>>;
  open: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
  openNotification: (type: NotificationType, error?: string) => void;
}

export default function AskModal({
  inputValue,
  setValue,
  open,
  setter,

  openNotification,
}: AskModalProps) {
  const [askOkButton, setAskOkButton] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSetInputValue = (e: any) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    setValue('');
    setAskOkButton(true);
    setter(false);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    handleClose();
    if (inputValue) {
      emailjs
        .sendForm('service_6xoddmk', 'template_h00hlf8', form.current || '', {
          publicKey: 'poTKJKaLXSv3zbRpI',
        })
        .then(
          () => {
            openNotification('success');
          },
          error => {
            openNotification('error', error.text);
            handleClose();
          },
        );
    }
  };

  useEffect(() => {
    if (open && inputValue.trim().length !== 0) {
      setAskOkButton(true);
    } else {
      setAskOkButton(false);
    }
  }, [inputValue, open, askOkButton]);

  return (
    <>
      <Modal
        title="문의 및 피드백하기"
        open={open}
        okText="보내기!"
        cancelText="취소"
        onOk={sendEmail}
        onCancel={handleClose}
        okButtonProps={{
          style: askOkButton
            ? { backgroundColor: 'rgb(91, 33, 255)', color: 'white' }
            : { backgroundColor: 'rgb(177, 148, 255)', color: 'white' },
          disabled: !askOkButton,
        }}
      >
        <form ref={form}>
          <TextArea
            name="description"
            showCount
            maxLength={350}
            value={inputValue}
            onChange={handleSetInputValue}
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ marginBottom: '2rem' }}
          />
        </form>
      </Modal>
    </>
  );
}
