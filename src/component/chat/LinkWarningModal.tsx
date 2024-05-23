import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';

interface LinkWarningModalProps {
  open: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
  link: string;
}

export default function LinkWarningModal({
  open,
  setter,
  link,
}: LinkWarningModalProps) {
  const onOkFunc = () => {
    setter(false);
    window.open(link, '_blank');
  };
  const onCancelFunc = () => {
    setter(false);
  };
  return (
    <>
      <Modal
        title="이 링크를 열면 외부 웹사이트로 이동합니다"
        width={325}
        open={open}
        closable={false}
        okText="링크열기"
        onOk={onOkFunc}
        okButtonProps={{
          style: { backgroundColor: 'rgb(91, 33, 255)', color: 'white' },
        }}
        cancelText="안 열래요"
        onCancel={onCancelFunc}
      ></Modal>
    </>
  );
}
