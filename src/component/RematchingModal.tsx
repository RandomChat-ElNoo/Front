import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const okButtonStyle = {
  background: 'rgba(91, 33, 255, 1)',
};

export default function RematchingModal() {
  const navigator = useNavigate();

  const onOkFunc = () => {
    window.location.reload();
  };

  const onCancelFunc = () => {
    navigator('/');
  };

  return (
    <>
      <Modal
        title="매칭 실패!"
        width={265}
        closable={false}
        maskClosable={false}
        open
        okText="재매칭!"
        onOk={onOkFunc}
        okButtonProps={okButtonStyle}
        cancelText="메인으로 돌아가기"
        onCancel={onCancelFunc}
      >
        매칭시간이 만료되었습니다.
      </Modal>
    </>
  );
}
