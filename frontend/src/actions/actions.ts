import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const getCategoriesAction = actionCreator.async<any, any, any>('FETCH_CATEGORIES')

export const downVoteCommentAction = actionCreator.async<any, any, any>('DOWNVOTE_COMMENT')
export const upVoteCommentAction = actionCreator.async<any, any, any>('UPVOTE_COMMENT')
export const editCommentAction = actionCreator.async<any, any, any>('EDIT_COMMENT')
export const deleteCommentAction = actionCreator.async<any, any, any>('DELETE_COMMENT')
export const addCommentAction = actionCreator.async<any, any, any>('ADD_COMMENT')

export const getAllPostsAction = actionCreator.async<any, any, any>('FETCH_ALL_POSTS')
export const getPostAction = actionCreator.async<any, any, any>('FETCH_POST')
export const getPostCommentsAction = actionCreator.async<any, any, any>('FETCH_POST_COMMENTS')
export const addPostAction = actionCreator.async<any, any, any>('ADD_POST')
export const editPostAction = actionCreator.async<any, any, any>('EDIT_POST')
export const deletePostAction = actionCreator.async<string, any, any>('DELETE_POST')
export const upVotePostAction = actionCreator.async<string, any, any>('UPVOTE_POST')
export const downVotePostAction = actionCreator.async<string, any, any>('DOWNVOTE_POST')
