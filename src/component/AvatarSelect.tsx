import { Button, ConfigProvider, Select } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import avatarList from '../utils/avatars';

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const selectStyle = {
  width: '100%',
  height: '4rem',
  borderRadius: '2rem',
  fontFamily: 'Pretendard',
  fontWeight: '500',
};

const buttonStyle = {
  width: '9.5rem',
  height: '4rem',
  padding: '1rem',
  borderRadius: '2rem',
  background: 'rgba(91, 33, 255, 1)',
  display: 'Flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#e8e8e8',
};

interface AvatarSelectProps {
  onClickFunc: () => void;
  AvatarValue: string | undefined;
  setAvatarValue: Dispatch<SetStateAction<string | undefined>>;
}

// interface SelectedAvatarValue {
//   value: string;
//   key: string;
// }

export default function AvatarSelect({
  onClickFunc,
  AvatarValue,
  setAvatarValue,
}: AvatarSelectProps) {
  const [avatarOptions, setAvatarOptions] = useState([{}]);

  const onSearch = (values: string) => {
    const filterdAvatar = avatarList.filter(avatar => {
      return avatar.value.includes(values);
    });
    setAvatarOptions(filterdAvatar);
  };

  const handleSelectChange = (value: any) => {
    setAvatarValue(value.value);
  };

  useEffect(() => {
    setAvatarOptions(avatarList);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              fontSize: 15,
              paddingSM: 20,
              borderRadius: 20,
            },
            Input: { paddingInlineSM: 20 },
            Button: { colorBorder: 'rgba(91, 33, 255, 1)' },
          },
        }}
      >
        <Container>
          <Select
            placeholder="아바타를 선택해주세요"
            onChange={handleSelectChange}
            style={selectStyle}
            onSearch={onSearch}
            showSearch
            value={AvatarValue}
            options={avatarOptions}
            filterOption={false}
            labelInValue
          />
          <Button style={buttonStyle} onClick={onClickFunc}>
            채팅하러가기
          </Button>
        </Container>
      </ConfigProvider>
    </>
  );
}
