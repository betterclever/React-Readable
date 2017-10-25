import {reducerWithInitialState} from "typescript-fsa-reducers"
import {Comment} from "../utils/model"
import {getCategoriesAction, getPostCommentsAction} from "../actions/actions"

export interface CommentState {
    [id: string]: Comment[];
}

const INITIAL_STATE: CommentState = {}

const CommentReducer = reducerWithInitialState(INITIAL_STATE)
    .caseWithAction(getCategoriesAction.started, (state: CommentState, val) => {
        console.log(state)
        return state
    })
    .caseWithAction(getPostCommentsAction.done, (state, {payload, meta}) => {
        return {
            ...state,
            [payload.result.id]: payload.result
        }
    })

export default CommentReducer