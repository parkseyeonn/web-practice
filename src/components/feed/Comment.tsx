import {Fragment} from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BoldText } from "../common";

interface IComment {
  isMine: boolean
  nickname: string
  payload: string
  commentId: number
  photoId: number
}

export default function Comment({
  isMine,
  nickname,
  payload,
  commentId,
  photoId,
}: IComment) {
  return (
    <CommentContainer>
      <Link to={`/users/${nickname}`}>
        <BoldText>{nickname}</BoldText>
      </Link>
      <CommentCaption>
        {payload.split(' ').map((word, index) =>  
        /^#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
          <Fragment key={index}>
            <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
          </Fragment>
        ) : (
          <Fragment key={index}>
            {word}
          </Fragment>
        )
        )}
      </CommentCaption>
      {isMine ?
        <CommentAction>
          <FontAwesomeIcon icon={faTrash}/>
        </CommentAction> : null
      }
    </CommentContainer>
  )
}

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.accentColor};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CommentAction = styled.button`
  svg {
    color: #dee2e6;
    &:hover {
      color: #ff6b6b;
    }
  }
`;