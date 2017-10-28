export interface Post {
    id: string,
    title: string,
    body: string,
    timestamp: number,
    author: string,
    category: string,
    commentCount: number,
    deleted: boolean,
    voteScore: number
}

export interface SubmitPost {
    id: string,
    timestamp: number,
    title: string,
    body: string,
    author: string,
    category: string,
}

export interface EditPostModel {
    id: string,
    title: string,
    body: string
}

export interface EditCommentModel {
    id: string,
    body: string,
    timestamp: number
}

export interface Category {
    name: string,
    path: string
}

export interface Comment {
    id: string,
    timestamp: number,
    body: string,
    author: string,
    parentId: string,
    voteScore: number,
    deleted: number
}