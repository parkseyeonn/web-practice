import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BoldText } from "../common";
import { Photo as PhotoTypes } from "../../gql/graphql";
import { useToggleLikeMutation } from "../../request";
import Avatar from "../Avatar";
import Comments from "./Comments";

type Props = Partial<PhotoTypes>;

function Photo ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: Props) {
  const { toggleLike, loading } = useToggleLikeMutation();

  const onToggleLikeClick = () => {
    if(loading) return null;
    toggleLike({
      variables: {id: id!},
      update: (cache: any) => {
        cache.modify({
          id: `Photo:${id}`,
          fields: {
            isLiked(prev: boolean) {
              return !prev;
            },
            likes(prev: number) {
              return prev + (isLiked? -1 : 1);
            }
          }
        });
      }
    });
  };
  return (
    <PhotoContainer>
      <PhotoHeader>
        <Link to={`/users/${user?.nickname}`}>
          <Avatar url={user?.avatar ?? ''} />
        </Link>
        <Link to={`/users/${user?.nickname}`}>
          <Nickname>{user?.nickname}</Nickname>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file}/>
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={onToggleLikeClick}>
              <FontAwesomeIcon 
              style={{color: isLiked ? "tomato": "inherit"}}
              icon={isLiked ? SolidHeart : faHeart} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>
          {likes === 1 ? "1 like" : `${likes} likes`}
        </Likes>
      </PhotoData>
      <Comments 
        nickname={user?.nickname!}
        caption={caption!}
        photoId={id!}
        commentNumber={commentNumber!}
        comments={comments!}
      /> 
    </PhotoContainer>
  )
}

export default Photo;

const PhotoContainer = styled.div`
  margin-bottom: 60px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: white;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Nickname = styled(BoldText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.button`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(BoldText)`
  display: block;
  margin-top: 15px;
`;