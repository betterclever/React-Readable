import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: { 'Authorization': 'udacity', 'Content-Type': 'application/json' }
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
    .then((result) => result.data)

export const upVotePost = (id: string) => axiosInstance.post(`posts/${id}`, { option: 'upVote' })
    .then((result) => result.data)
export const downVotePost = (id: string) => axiosInstance.post(`posts/${id}`, { option: 'downVote' })
    .then((result) => result.data)

export const editPost = (post: any) => axiosInstance.put(`posts/${post.id}`, {
    title: post.title,
    body: post.body
})
    .then((result) => result.data)

export const editComment = (comment: any) => axiosInstance.put(`comments/${comment.id}`, {
    timestamp: comment.timestamp,
    body: comment.body
})
    .then((result) => result.data)

export const deletePost = (id: string) => axiosInstance.delete(`posts/${id}`)
    .then((result) => result.data)

export const getPostComments = (id: string) => axiosInstance.get(`posts/${id}/comments`)
    .then((result) => result.data)
export const addNewComment = (comment: any) => axiosInstance.post(`comments`, comment)
    .then((result) => result.data)
export const getCommentDetails = (id: string) => axiosInstance.get(`comments/${id}`)
    .then((result) => result.data)
export const upVoteComment = (id: string) => axiosInstance.post(`comments/${id}`, { option: 'upVote' })
    .then((result) => result.data)
export const downVoteComment = (id: string) => axiosInstance.post(`comments/${id}`, { option: 'downVote' })
    .then((result) => result.data)
export const deleteComment = (id: string) => axiosInstance.delete(`comments/${id}`)
    .then((result) => result.data)
