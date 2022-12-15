import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Comment as CommentType } from "../../gql/graphql" ;
import Comment from "./Comment";
import useUser from "../../hooks/useUser";
import { useCreateCommentMutation } from "../../request";

interface Props {
  nickname: string
  caption: string
  photoId: number
  commentNumber: number
  comments: (CommentType | null)[]
}

export default function Comments({
  nickname,
  caption,
  photoId,
  commentNumber,
  comments,
}: Props) {
  const user = useUser();
  const {createComment, loading} = useCreateCommentMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: {isValid}
  } = useForm({
    mode: "onChange"
  });

  const onSubmitValid = () => {
    if(loading) return null;
    const {payload} = getValues();
    createComment({
      variables: {
        photoId,
        payload,
      },
      update: (cache, result) => {
        setValue('payload', '');
        const {ok, id} = result.data?.createComment!;
        if (ok && user) {
          const newComment = {
            __typename: 'Comment',
            id,
            payload,
            isMine: true,
            createdAt: new Date() + '',
            user: {
              ...user,
            }
          };
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              comments(prev) {
                return [...prev, newComment];
              },
              commentNumber(prev) {
                return prev + 1;
              }
            }
          });
        }
      }
    });
  }
  return (
    <CommentsContainer>
      <Comment nickname={nickname} payload={caption} />
      <CommentCount>
        {commentNumber === 0 ? null : `댓글 ${commentNumber}개 모두 보기`}
      </CommentCount>
      {
        comments.map(comment => (
          comment?.id ? 
          <Comment 
            key={comment.id}
            nickname={comment.user.nickname}
            payload={comment.payload}
            isMine={comment.isMine}
            photoId={photoId}
            commentId={comment.id}
          /> : null
        ))
      }
      <PostCommentsContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
           <CommentInput 
              {...register('payload', {
                required: "댓글을 입력해주세요"
              })}
              type="text"
              placeholder="댓글 추가..."
           />
          <CommentButton disabled={!isValid} type="submit">
            게시
          </CommentButton> 
        </form>
      </PostCommentsContainer>
    </CommentsContainer>
  );
}

const PostCommentsContainer = styled.div`
  padding: 10px 0;
  border-top: 1px solid ${props => props.theme.borderColor};
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CommentButton = styled.button`
  background-color: white;
  color: ${props => props.theme.accentColor};
  font-weight: 600;
  &:disabled{
    opacity: .3;
  }
`;

const CommentInput = styled.input`
  width: 90%;
  height: 18px;
  font-size: 14px;
  border: none;
`;

const CommentsContainer = styled.div`
  padding: 0 15px;
`;

const CommentCount = styled.div`
  margin-bottom: 4px;
  color: #8e8e8e;
  font-size: 14px;
  cursor: pointer;
`;