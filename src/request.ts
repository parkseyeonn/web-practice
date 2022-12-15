import { 
  gql,
  MutationHookOptions,
  useQuery,
  useMutation
} from "@apollo/client"; 
import { 
  MutationResponse, 
  Photo, 
  Scalars, 
  User,
  MutationToggleLikeArgs,
  MutationCreateCommentArgs,
  MutationEditCommentArgs,
  MutationDeleteCommentArgs,
  MutationToggleFollowArgs
 } from "./gql/graphql";
 import {
  USER_FRAGMENT,
  PHOTO_FRAGMENT,
  COMMENT_FRAGMENT
 } from "./fragments";

const SEE_FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      id
      user {
        nickname
        avatar
      }
      file
      caption
      likes
      commentNumber
      createdAt
      isMine
      isLiked
      comments {
        id
        payload
        user {
          nickname
        }
        createdAt
      }
    }
  }
`;

type seeFeedQuery = {
  seeFeed: Array<
    Pick<
      Photo,
      | 'id'
      | 'user'
      | 'file'
      | 'caption'
      | 'likes'
      | 'commentNumber'
      | 'comments'
      | 'createdAt'
      | 'isMine'
      | 'isLiked'
    >
  >;
}

type seeFeedQueryVariables = {
  offset: Scalars['Int']
}

export function useSeeFeedQuery(opts?: MutationHookOptions<
  seeFeedQuery,
  seeFeedQueryVariables  
>) {
  const {data, error, loading} = useQuery<
    seeFeedQuery,
    seeFeedQueryVariables
  >(SEE_FEED_QUERY, opts);
  return {data, error, loading};
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

type toggleLikeMutation = {
  toggleLike: MutationResponse
}

export function useToggleLikeMutation(opts?: MutationHookOptions<
  toggleLikeMutation,
  MutationToggleLikeArgs
>){
  const [toggleLike, {loading}] = useMutation<
    toggleLikeMutation,
    MutationToggleLikeArgs
  >(TOGGLE_LIKE_MUTATION, opts);
  return {toggleLike, loading};
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok 
      error
      id
    }
  }
`;

type createCommentMutation = {
  createComment: MutationResponse
}

export function useCreateCommentMutation(opts?: MutationHookOptions<
  createCommentMutation,
  MutationCreateCommentArgs
>){
  const [createComment, {loading}] = useMutation<
    createCommentMutation,
    MutationCreateCommentArgs
  >(CREATE_COMMENT_MUTATION, opts);
  return {createComment, loading};
}

const EDIT_COMMENT_MUTATION = gql`
  mutation editComment($id: Int!, $payload: String!) {
    editComment(id: $id, payload: $payload) {
      ok 
      error
    }
  }
`;

type editCommentMutation = {
  editComment: MutationResponse
}

export function useEditCommentMutation(opts?: MutationHookOptions<
  editCommentMutation,
  MutationEditCommentArgs
>){
  const [editComment, {loading}] = useMutation<
    editCommentMutation,
    MutationEditCommentArgs
  >(EDIT_COMMENT_MUTATION, opts);
  return {editComment, loading};
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

type deleteCommentMutation = {
  deleteComment: MutationResponse
}

export function useDeleteCommentMutation(opts?: MutationHookOptions<
  deleteCommentMutation,
  MutationDeleteCommentArgs
>){
  const [deleteComment, {loading}] = useMutation<
    deleteCommentMutation,
    MutationDeleteCommentArgs
  >(DELETE_COMMENT_MUTATION, opts);
  return {deleteComment, loading};
}

const SEE_PROFILE_QUERY = gql`
  ${PHOTO_FRAGMENT}
  ${USER_FRAGMENT}
  query seeProfile($nickname: String!, $page: Int!) {
    seeProfile(nickname: $nickname) {
      ...UserFragment
      name
      bio
      isFollowing
      totalFollowing
      totalFollowers
      photos(page: $page) {
        ...PhotoFragment
      }
    }
  }
`;

type seeProfileQuery = {
  seeProfile: User
}

type seeProfileQueryVariables = {
  nickname: Scalars['String']
  page: Scalars['Int']
}

// todo update photo pagination
export function useSeeProfileQuery(opts: MutationHookOptions<
  seeProfileQuery,
  seeProfileQueryVariables
>){
  const {loading, data} = useQuery<
    seeProfileQuery,
    seeProfileQueryVariables
  >(SEE_PROFILE_QUERY, opts);
  return {loading, data};
}

const TOGGLE_FOLLOW_MUTATION = gql`
  mutation toggleFollow($nickname: String!) {
    toggleFollow(nickname: $nickname){
      ok
      error
    }
  }
`;

type toggleFollowMutation = {
  toggleFollow: MutationResponse
}

export function useToggleFollowMutation(opts?: MutationHookOptions<
  toggleFollowMutation,
  MutationToggleFollowArgs
>) {
  const [toggleFollow, {loading}] = useMutation<
    toggleFollowMutation,
    MutationToggleFollowArgs
  >(TOGGLE_FOLLOW_MUTATION, opts);
  return {toggleFollow, loading};
}