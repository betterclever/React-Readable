import actionCreatorFactory from 'typescript-fsa'
const actionCreator = actionCreatorFactory()

export const getAllPostsAction = actionCreator.async<any, any, any>('FETCH_ALL_POSTS')
export const getPostAction = actionCreator.async<any,any,any>('FETCH_POST')
export const getCategoriesAction = actionCreator.async<any,any,any>('FETCH_CATEGORIES')

export const getPostCommentsAction = actionCreator.async<any,any,any>('FETCH_POST_COMMENTS')

export const upVotePostAction = actionCreator.async<string,any,any>('UPVOTE_POST')
export const downVotePostAction = actionCreator.async<string,any,any>('DOWNVOTE_POST')

export const addPostAction = actionCreator.async<any,any,any>('ADD_POST')
export const deletePostAction = actionCreator.async<string,any,any>('DELETE_POST')