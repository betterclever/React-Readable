import {reducerWithInitialState} from "typescript-fsa-reducers"
import {Post} from "../utils/model"
import {getAllPostsAction} from "../actions/actions"

export interface PostState {
    posts: Post[],
    isFetching: boolean,
}

const INITIAL_STATE: PostState = {
    posts: [],
    isFetching: false
}

const PostReducer = reducerWithInitialState(INITIAL_STATE)
    .caseWithAction(getAllPostsAction.started, (state, {payload, meta}) => {
        return ({
            ...state,
            isFetching: true
        })
    })
    .caseWithAction(getAllPostsAction.done, (state, {payload, meta}) => {
        return {
            ...state,
            isFetching: false,
            posts: payload.result
        }
    })

export default PostReducer