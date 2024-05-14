import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { socketJoin } from '../utils/soket';

interface RematchingModalProps {
  open: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}

export default function RematchingModal({
  open,
  setter,
}: RematchingModalProps) {
  const navigator = useNavigate();

  const onOkFunc = () => {
    setter(false);
    socketJoin();
  };

  const onCancelFunc = () => {
    setter(false);
    navigator('/');
  };

  return (
    <>
      <Modal
        title="매칭 실패!"
        width={265}
        closable={false}
        maskClosable={false}
        open={open}
        okText="재매칭!"
        onOk={onOkFunc}
        okButtonProps={{
          style: { backgroundColor: 'rgb(91, 33, 255)', color: 'white' },
        }}
        cancelText="메인으로 돌아가기"
        onCancel={onCancelFunc}
      >
        매칭시간이 만료되었습니다.
      </Modal>
    </>
  );
}
