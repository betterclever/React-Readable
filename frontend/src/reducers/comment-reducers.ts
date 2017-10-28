import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Comment } from '../utils/model'
import {
    addCommentAction,
    deleteCommentAction,
    downVoteCommentAction,
    editCommentAction,
    getCategoriesAction,
    getPostCommentsAction,
    upVoteCommentAction
} from '../actions/actions'

export interface CommentState {
    [id: string]: Comment[]
}

const INITIAL_STATE: CommentState = {}

const CommentReducer = reducerWithInitialState(INITIAL_STATE)
    .caseWithAction(getCategoriesAction.started, (state: CommentState, val) => {
        return state
    })
    .caseWithAction(getPostCommentsAction.done, (state, { payload }) => {
        return {
            ...state,
            [payload.params]: payload.result
        }
    })
    .caseWithAction(addCommentAction.done, (state, action) => ({
        ...state,
        [action.payload.result.parentId]: state[action.payload.result.parentId].concat(action.payload.result)
    }))
    .casesWithAction([upVoteCommentAction.done, downVoteCommentAction.done,
    deleteCommentAction.done, editCommentAction.done],
    (state, action) => {
        const pId = action.payload.result.parentId
        const id = action.payload.result.id
        const updatedComment = action.payload.result
        return {
            ...state,
            [pId]: state[pId].map((comment) => (comment.id === id) ? updatedComment : { ...comment })
        }
    })

export default CommentReducer