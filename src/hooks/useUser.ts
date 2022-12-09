import {gql, useQuery, useReactiveVar} from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../reactiveVar";

const ME_QUERY = gql`
  query me {
    me {
      id
      name
      avatar
    }
  }
`;

export interface IUser {
  id: Number
  name: String
  avatar?: String
}

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const {data, error} = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  });
  useEffect(() => {
    console.log('useUser', data, error);
    // if (data?.me === null) {
    //   logUserOut();
    // }
  }, [data]);
  return data?.me ? data.me : null;
}

export default useUser;