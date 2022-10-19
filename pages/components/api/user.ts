import { gql } from "@apollo/client";
import { client } from "../../_app";

const GET_USER = gql`
  query user {
    getSingleUser {
      _id
      username
    }
  }
`;

export const getUser = async () => {
  return client
    .query({
      query: GET_USER,
    })
    .then(({ data }) => data.getSingleUser);
};
