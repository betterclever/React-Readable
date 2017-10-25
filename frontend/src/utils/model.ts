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

