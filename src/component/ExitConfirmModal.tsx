import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

interface ExitConfirmModalProps {
  open: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}
export default function ExitConfirmModal({
  open,
  setter,
}: ExitConfirmModalProps) {
  const navigator = useNavigate();

  const onOkFunc = () => {
    setter(false);
    navigator('/');
  };
  const onCancelFunc = () => {
    setter(false);
  };
  return (
    <>
      <Modal
        title="나가실 건가요?"
        open={open}
        closable={false}
        okText="나가기"
        onOk={onOkFunc}
        okButtonProps={{
          style: { backgroundColor: 'rgb(91, 33, 255)', color: 'white' },
        }}
        cancelText="잘못 눌렀어요"
        onCancel={onCancelFunc}
      ></Modal>
    </>
  );
}
