import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Post } from '../utils/model'
import {
    deletePostAction,
    downVotePostAction,
    getAllPostsAction,
    getPostAction,
    upVotePostAction
} from '../actions/actions'

export interface PostState {
    posts: { [id: string]: Post; },
    isFetching: boolean,
}

const INITIAL_STATE: PostState = {
    posts: {},
    isFetching: false
}

const PostReducer = reducerWithInitialState(INITIAL_STATE)
    .caseWithAction(getAllPostsAction.started, (state, { payload, meta }) => {
        return ({
            ...state,
            isFetching: true
        })
    })
    .caseWithAction(getAllPostsAction.done, (state, { payload, meta }) => {
        return {
            ...state,
            isFetching: false,
            posts: (payload.result as Post[])
                .reduce((postObject, post) => {
                    postObject[post.id] = post
                    return postObject
                }, {})
        }
    })
    .casesWithAction([upVotePostAction.done, downVotePostAction.done], (state: PostState, action) => {
        return {
            ...state,
            posts: {
                ...state.posts,
                [action.payload.params]: action.payload.result
            }
        }
    })
    .caseWithAction(deletePostAction.done, (state, action) => {
        return {
            ...state,
            posts: {
                ...state.posts,
                [action.payload.params]: action.payload.result
            }
        }
    })
    .caseWithAction(getPostAction.done, (state, action) => ({
        ...state,
        posts: {
            ...state.posts,
            [action.payload.params]: action.payload.result
        }
    }))

export default PostReducer