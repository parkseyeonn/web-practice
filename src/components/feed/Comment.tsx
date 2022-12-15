import {Fragment} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BoldText } from "../common";
import { useDeleteCommentMutation } from "../../request";
import { openAlert } from "../../reactiveVar";

interface Props {
  nickname: string
  payload: string
  commentId?: number
  photoId?: number
  isMine?: boolean
}

export default function Comment({
  isMine,
  nickname,
  payload,
  commentId,
  photoId,
}: Props) {
  const {deleteComment, loading} = useDeleteCommentMutation();

  const onDeleteClick = () => {
    if (loading) return null;
    openAlert({
      message: "댓글을 삭제하시겠습니까?",
      cancelText: "취소",
      submitText: "확인",
      submitCallback: () => {
        deleteComment({
          variables: {id: commentId!},
          update: (cache, result) => {
            const {ok} = result.data?.deleteComment!;
            if (ok) {
              cache.evict({
                id: `Comment:${commentId}`
              });
              cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                  commentNumber(prev) {
                    return prev - 1;
                  }
                }
              })
            }
          }
        })
      }
    });
  };

  return (
    <CommentContainer>
      <Link to={`/users/${nickname}`}>
        <BoldText>{nickname}</BoldText>
      </Link>
      <CommentCaption>
        {payload?.split(' ').map((word, index) =>  
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
        <CommentAction onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrash}/>
        </CommentAction> : null
      }
    </CommentContainer>
  )
}

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
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