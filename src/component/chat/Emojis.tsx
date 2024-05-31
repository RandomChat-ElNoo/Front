import { useEffect, useState, MutableRefObject } from 'react';
import styled from 'styled-components';

const ImgContainer = styled.div`
  width: 15rem;
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  @media (max-width: 520px) {
    width: 9rem;
    height: 9rem;
  }
`;

interface EmojiProps {
  content: string;
  scrollRef: MutableRefObject<HTMLDivElement | null>;
}

export default function Emojis({ content, scrollRef }: EmojiProps) {
  const [imgSrc, setImgSrc] = useState<string>('');
  useEffect(() => {
    switch (content) {
      case ':Hello:':
        setImgSrc('/Imgs/VRC_icon.svg');
        break;
      case ':Bye:':
        setImgSrc('/Imgs/VRC_icon.svg');
        break;
      case ':LOL:':
        setImgSrc('/Imgs/VRC_icon.svg');
        break;
      case ':FreakOut:':
        setImgSrc('/Imgs/VRC_icon.svg');
        break;
      case ':Dizzy:':
        setImgSrc('/Imgs/VRC_icon.svg');
        break;
      case ':Angry:':
        setImgSrc('/Imgs/VRC_icon.svg');
        break;
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content, scrollRef]);

  return (
    <ImgContainer>
      <img src={imgSrc} alt="이모지" />
    </ImgContainer>
  );
}
