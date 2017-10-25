import {reducerWithInitialState} from "typescript-fsa-reducers"
import {Post} from "../utils/model"
import {deletePostAction, downVotePostAction, getAllPostsAction, upVotePostAction} from "../actions/actions"

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
    .casesWithAction([upVotePostAction.done, downVotePostAction.done], (state: PostState, action) => ({
        ...state,
        posts: state.posts.map((post) => post.id ===  action.payload.params ? action.payload.result : {...post})
    }))
    .caseWithAction(deletePostAction.done, (state, action) => ({
        ...state,
        posts: state.posts.map((post) => post.id === action.payload.params ? action.payload.result.data : {...post})
    }))


export default PostReducer