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
  MutationToggleLikeArgs
 } from "./gql/graphql";

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