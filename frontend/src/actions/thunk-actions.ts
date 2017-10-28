import {
    addCommentAction,
    addPostAction,
    deleteCommentAction,
    deletePostAction,
    downVotePostAction,
    editCommentAction,
    editPostAction,
    getAllPostsAction,
    getCategoriesAction,
    getPostAction,
    getPostCommentsAction,
    upVoteCommentAction,
    upVotePostAction
} from './actions'

import * as api from '../utils/api'
import wrapAsyncWorker from './wrapAsAsyncWorker'
import { SubmitPost } from '../utils/model'

export const getPostWorker = wrapAsyncWorker(getPostAction, (id: string) => api.getPostDetails(id))
export const getAllPostsWorker = wrapAsyncWorker(getAllPostsAction, (): Promise<any> => api.getAllPosts())

export const getCategoriesWorker = wrapAsyncWorker(getCategoriesAction, () => api.getCategories())
export const getPostCommentsWorker = wrapAsyncWorker(getPostCommentsAction, (id) => api.getPostComments(id))

export const upVotePostWorker = wrapAsyncWorker(upVotePostAction, (id) => api.upVotePost(id))
export const downVotePostWorker = wrapAsyncWorker(downVotePostAction, (id) => api.downVotePost(id))
export const upVoteCommentWorker = wrapAsyncWorker(upVoteCommentAction, (id) => api.upVoteComment(id))
export const downVoteCommentWorker = wrapAsyncWorker(upVoteCommentAction, (id) => api.downVoteComment(id))

export const addCommentWorker = wrapAsyncWorker(addCommentAction, (comment) => api.addNewComment(comment))
export const deleteCommentWorker = wrapAsyncWorker(deleteCommentAction, (id) => api.deleteComment(id))
export const editCommentWorker = wrapAsyncWorker(editCommentAction, (comment) => api.editComment(comment))

export const deletePostWorker = wrapAsyncWorker(deletePostAction, (id) => api.deletePost(id))
export const addPostWorker = wrapAsyncWorker(addPostAction, (post: SubmitPost) => api.addNewPost(post))
export const editPostWorker = wrapAsyncWorker(editPostAction, (post) => api.editPost(post))
