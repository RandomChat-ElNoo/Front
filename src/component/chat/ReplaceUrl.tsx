import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import LinkWarningModal from './LinkWarningModal';

const StyledLink = styled.a`
  text-decoration: none;
  color: rgba(91, 33, 255, 1);
  &:hover {
    text-decoration: underline;
  }
`;

interface ReplaceUrlProps {
  text: string;
}

export default function ReplaceUrl({ text }: ReplaceUrlProps) {
  const [linkWarningModal, setLinkWarningModal] = useState(false);

  const urlRegex =
    /(?:https:\/\/)(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}(?:[-a-zA-Z0-9@:%_+.~#?&/=]*)/g;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setLinkWarningModal(true);
  };

  const parts = text.split(urlRegex);

  const matches = text.match(urlRegex);

  const linkifiedText = parts.reduce((acc, part, index) => {
    acc.push(part);
    if (matches && matches[index]) {
      acc.push(
        <>
          <LinkWarningModal
            link={matches[index]}
            open={linkWarningModal}
            setter={setLinkWarningModal}
          />
          <StyledLink key={index} href={matches[index]} onClick={handleClick}>
            {matches[index]}
          </StyledLink>
        </>,
      );
    }
    return acc;
  }, [] as (string | JSX.Element)[]);

  return <>{linkifiedText}</>;
}
