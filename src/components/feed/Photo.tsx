import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BoldText } from "../common";
import Avatar from "../Avatar";
import { Photo as PhotoTypes } from "../../gql/graphql";
import { useToggleLikeMutation } from "../../request";

type PhotoProps = Partial<PhotoTypes>;

function Photo ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: PhotoProps) {
  const { toggleLike, loading } = useToggleLikeMutation({
    variables: {id: id!},
    update: (cache: any) => {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            return prev + (isLiked? -1 : 1);
          }
        }
      })
    }
  });
  return (
    <PhotoContainer>
      <PhotoHeader>
        <Avatar url={user?.avatar ? user.avatar : ''} />
        <Nickname>{user?.nickname}</Nickname>
      </PhotoHeader>
      <PhotoFile src={file}/>
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLike()}>
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

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(BoldText)`
  display: block;
  margin-top: 15px;
`;