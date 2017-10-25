import actionCreatorFactory from 'typescript-fsa'
import any = jasmine.any

const actionCreator = actionCreatorFactory()

export const getAllPostsAction = actionCreator.async<any, any, any>('FETCH_ALL_POSTS')
export const getPostAction = actionCreator.async<any,any,any>('FETCH_POST')
export const getCategoriesAction = actionCreator.async<any,any,any>('FETCH_CATEGORIES')

export const getPostCommentsAction = actionCreator.async<any,any,any>('FETCH_POST_COMMENTS')

export const addPostAction = actionCreator.async<any,any,any>('ADD_POST')