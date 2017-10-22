import bindThunkAction from "typescript-fsa-redux-thunk"
import {getAllPostsAction, getPostAction} from "./actions"
import * as api from '../utils/api'

export const fetchAllPostsWorker = bindThunkAction(getAllPostsAction, async () => {
    return await api.getAllPosts()
})

export const fetchPostWorker = bindThunkAction(getPostAction, async (id) => {
    return await api.getPostDetails(id)
})