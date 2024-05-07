import { Dispatch, SetStateAction, useRef } from 'react';
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
  const form = useRef<HTMLFormElement>(null);

  const handleSetInputValue = (e: any) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    setter(false);
    setValue('');
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    if (inputValue) {
      emailjs
        .sendForm('service_6xoddmk', 'template_h00hlf8', form.current || '', {
          publicKey: 'poTKJKaLXSv3zbRpI',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            openNotification('success');
            handleClose();
          },
          error => {
            console.log('FAILED...', error.text);
            openNotification('error', error.text);
            handleClose();
          },
        );
    }
  };

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
          style: { backgroundColor: 'rgb(91, 33, 255)', color: 'white' },
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
