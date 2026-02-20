import { gql } from "@apollo/client";

export const GET_PLANS = gql`
 query getPlans($userId: Int!) {
    getPlans(userId: $userId) {
        id
        name
        dueDate
        status
        description
    }
 }`;