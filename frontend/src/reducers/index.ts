import {combineReducers} from "redux"
import PostReducer from "./post-reducers"
import CategoryReducer from "./category-reducers"

const rootReducer = combineReducers({
    posts: PostReducer,
    categories: CategoryReducer
})

export default rootReducer;