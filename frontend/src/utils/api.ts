import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {'Authorization': 'udacity'}
})

export const getAllPosts = (): Promise<any> => axiosInstance.get('posts')
    .then((result) => result.data)

export const getCategories = () => axiosInstance.get('categories')
    .then((result) => result.data)
export const getPostOfCategory = (category: any) => axiosInstance.get(`${category}/posts`)
    .then((result) => result.data)

export const addNewPost = (post: any) => axiosInstance.post('posts', post)
    .then((result) => result.data)

export const getPostDetails = (id: string) => axiosInstance.get(`posts/${id}`)

export const upVotePost = (id: string) => axiosInstance.post(`posts/${id}`, {option: "upVote"})
    .then((result) => result.data)
export const downVotePost = (id: string) => axiosInstance.post(`posts/${id}`, {option: "downVote"})
    .then((result) => result.data)

export const editPost = (post: any) => axiosInstance.put(`posts/${post.id}`, JSON.stringify({
    title: post.title,
    body: post.body
}))

export const deletePost = (id: string) => axiosInstance.delete(`posts/${id}`)

export const getPostComments = (id: string) => axiosInstance.get(`posts/${id}/comments`)
export const addNewComment = (comment: any) => axiosInstance.post(`comments`, JSON.stringify(comment))
export const getCommentDetails = (id: string) => axiosInstance.get(`comments/${id}`)
export const upVoteComment = (id: string) => axiosInstance.post(`comments/${id}`, 'upVote')
export const downVoteComment = (id: string) => axiosInstance.post(`comments/${id}`, 'downVote')
export const deleteComment = (id: string) => axiosInstance.delete(`comments/${id}`)
