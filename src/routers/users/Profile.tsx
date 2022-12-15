import { Outlet, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccentButton, BoldText } from "../../components/common";
import PageTitle from "../../components/PageTitle";
import { useSeeProfileQuery, useToggleFollowMutation } from "../../request";

function Profile () {
  const {nickname} = useParams();
  const {data, loading: seeProfileLoading} = useSeeProfileQuery({
    variables: {nickname: nickname!, page: 1},
  });
  const {toggleFollow, loading: toggleFollowloading} = useToggleFollowMutation();

  if (seeProfileLoading) return <p>로딩중...</p>;
  if (!data?.seeProfile) return <p>존재하지 않는 계정입니다.</p>;

  const {id, isMe, isFollowing, totalFollowing, totalFollowers, name, bio} = data.seeProfile;

  const onClickFollow = () => {
    if(toggleFollowloading) return;
    toggleFollow({
      variables: {
        nickname: nickname!
      },
      update: (cache, result) => {
        if(result?.data?.toggleFollow?.ok) {
          cache.modify({
            id: `User:${id}`,
            fields: {
              isFollowing(prev) {
                return !prev;
              },
              totalFollowers(prev, { readField }) {
                return prev + ( readField('isFollowing') ? -1 : 1);
              },
            }
          });
        }
      }
    })
  };

  const getFollowButton = () => {
    if(isMe) {
      return (<ProfileButton>
        프로필 편집
      </ProfileButton>);
    }
    return (<ProfileButton onClick={onClickFollow}>
      {isFollowing ? '팔로우 취소' : '팔로잉'}
    </ProfileButton>);
  };

  return (
    <>
      <PageTitle title={`@(${nickname}) • Instaclone 사진 및 동영상`} />
      <Header>
        <Avatar />
        <Column>
          <Row>
            <Username>{nickname}</Username>
          </Row>
          <Row>
            <List>
              <Item>
                팔로워 <Value>{totalFollowing}</Value>
              </Item>
              <Item>
                팔로잉 <Value>{totalFollowers}</Value>
              </Item>
              <Item>{getFollowButton()}</Item>
            </List>
          </Row>
          <Row>
            <Name>{name}</Name>
          </Row>
          <Row>
            <Name>{bio}</Name>
          </Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          photo ? 
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo> : null
        ))}
      </Grid>
      <Link to="followers">See followers</Link>
      <Outlet 
        context={{
          message: "i love my holiday"
        }}
      />
    </>
  )
}

export default Profile;

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  margin: 0 50px 0 0;
  border-radius: 50%;
  border: 1px solid #222;
`;

const Column = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
`;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
  white-space: nowrap;
`;

const Value = styled(BoldText)`
  font-size: 18px;
`;

const Name = styled(BoldText)`
  font-size: 20px;
`;

const Grid =  styled.div`
  display: grid;
  grid-auto-rows: 200px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{bg: string}>`
  position: relative;
  flex: 1;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  color: white;
  opacity: 0;
  transition: .2s;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 5px;
  font-size: 18px;
  svg {
    margin-right: 5px;
    font-size: 14px;
  }
`;

const ProfileButton = styled(AccentButton)`
  padding: 5px 10px;
`;