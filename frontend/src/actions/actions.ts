import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const getAllPostsAction = actionCreator.async<any, any, any>('FETCH_ALL_POSTS')
export const getPostAction = actionCreator.async<any,any,any>('FETCH_POST')