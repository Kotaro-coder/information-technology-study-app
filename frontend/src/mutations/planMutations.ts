import { gql } from "@apollo/client";

export const CREATE_PLAN = gql`
 mutation createPlan($createPlanInput: CreatePlanInput!) {
    createPlan(createPlanInput: $createPlanInput) {
        id
        name
        dueDate
        status
        description
    }
 }`

 export const UPDATE_PLAN = gql`
  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {
    updatePlan(updatePlanInput: $updatePlanInput) {
        id
        name
        dueDate
        status
        description
    }
  }`

export const DELETE_PLAN = gql`
 mutation deletePlan($id: Int!) {
    deletePlan(id: $id) {
        id
    }
 }`