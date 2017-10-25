import {
    deletePostAction,
    downVotePostAction,
    getAllPostsAction,
    getCategoriesAction,
    getPostAction,
    getPostCommentsAction,
    upVotePostAction
} from "./actions"

import * as api from '../utils/api'
import wrapAsyncWorker from "./wrapAsAsyncWorker"

export const getPostWorker = wrapAsyncWorker(getPostAction, (id: string) => api.getPostDetails(id))
export const getAllPostsWorker = wrapAsyncWorker(getAllPostsAction, (): Promise<any> => api.getAllPosts())

export const getCategoriesWorker = wrapAsyncWorker(getCategoriesAction, () => api.getCategories())
export const getPostCommentsWorker = wrapAsyncWorker(getPostCommentsAction, (id) => api.getPostComments(id))

export const upVotePostWorker = wrapAsyncWorker(upVotePostAction, (id) => api.upVotePost(id))
export const downVotePostWorker = wrapAsyncWorker(downVotePostAction, (id) => api.downVotePost(id))
export const deletePostWorker = wrapAsyncWorker(deletePostAction, (id) => api.deletePost(id))