import { combineReducers } from 'redux'
import PostReducer from './post-reducers'
import CategoryReducer from './category-reducers'
import CommentReducer from './comment-reducers'

const rootReducer = combineReducers({
    posts: PostReducer,
    categories: CategoryReducer,
    comments: CommentReducer
})

export default rootReducer