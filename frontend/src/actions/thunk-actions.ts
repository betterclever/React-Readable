import {getAllPostsAction, getCategoriesAction, getPostAction, getPostCommentsAction} from "./actions"
import * as api from '../utils/api'
import wrapAsyncWorker from "./wrapAsAsyncWorker"

export const getPostWorker = wrapAsyncWorker(getPostAction, (id: string) => api.getPostDetails(id))
export const getAllPostsWorker = wrapAsyncWorker(getAllPostsAction, (): Promise<any> => api.getAllPosts())

export const getCategoriesWorker = wrapAsyncWorker(getCategoriesAction, () => api.getCategories())
export const getPostCommentsWorker = wrapAsyncWorker(getPostCommentsAction, (id) => api.getPostComments(id))
