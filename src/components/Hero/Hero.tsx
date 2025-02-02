import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Container } from '../templates/Container';
import { Button as ButtonComponent } from '../atoms/Button';
import { Star } from '../animations/star';
import { Meteor1, Meteor2 } from '../animations/meteor';
import { blackColor, whiteColor } from '../../variables';
import { mediaQueries } from '../../utils/mediaQueries';
import { File, DataJson } from '../../../generated-types/gatsby-graphql';

const Box = styled(Container)`
  background: ${blackColor};
  color: ${whiteColor};
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const Avatar = styled.div<{ url: string }>`
  background: ${({ url }) => `url('${url}')`};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 50%;
  height: 120px;
  width: 120px;
`;

const Buttons = styled.div`
  display: flex;
  margin: 16px 0;

  & > * {
    flex: auto;
    margin: 0 10px;
  }

  ${mediaQueries.tablet`
    flex-wrap: wrap;

    & > * {
      margin: 10px;
      width: 24%;
    }
  `};
`;

const Button = styled(ButtonComponent)`
  color: ${whiteColor};
  font-size: 1.8rem;
  transition: color 0.7s;

  &:visited {
    color: ${whiteColor};
  }

  &:hover {
    color: ${({ color }: { color: string }) => color};
  }

  &:before {
    border-radius: 3px;
    border-bottom: 3px solid ${({ color }: { color: string }) => color};
    border-left: 3px solid ${({ color }: { color: string }) => color};
    transform-origin: 0 100%;
  }

  &:after {
    border-radius: 3px;
    border-top: 3px solid ${({ color }: { color: string }) => color};
    border-right: 3px solid ${({ color }: { color: string }) => color};
    transform-origin: 100% 0%;
  }
`;

const SupportButton = styled(Button)`
  font-size: 2rem;
  width: auto;
`;

const query = graphql`
  query {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fixed(width: 200) {
          base64
          width
          height
          src
          srcSet
        }
      }
    }
    dataJson {
      sns {
        service
        url
        color
      }
    }
  }
`;

export const Hero: React.FC = () => {
  const {
    file,
    dataJson: { sns },
  } = useStaticQuery<{ file: File; dataJson: DataJson }>(query);
  const avatar = file?.childImageSharp?.fixed?.src;
  const snsList = sns?.filter((account) => {
    return ['GitHub', 'Twitter', 'FaceBook', 'Hatena'].includes(account?.service!);
  });

  return (
    <Box className="Hero">
      <div>
        {[...Array(29)].map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      {[...Array(4)].map((_, i) => (
        <Meteor1 key={i} />
      ))}
      {[...Array(4)].map((_, i) => (
        <Meteor2 key={i} />
      ))}
      {avatar && <Avatar className="transition" url={avatar} />}
      <h1 className="transition">hiroppy</h1>
      <br />
      <SupportButton
        link="https://github.com/sponsors/hiroppy"
        className="transition"
        color="#e85b46"
      >
        Support hiroppy as a sponsor
      </SupportButton>
      <br />
      <h3 className="transition">I am a JavaScript junkie!</h3>
      <p className="transition">
        Working on Node.js, webpack, babel, and Japan Node.js Association.
      </p>
      <Buttons className="transition">
        {
          snsList?.map((sns) => (
            sns?.url && sns?.color && <Button link={sns.url} color={sns.color}>
              {sns?.service}
            </Button>
          ))
        }
      </Buttons>
    </Box>
  );
};
