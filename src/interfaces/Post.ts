export interface Post {
    id: string,
    userId: string,
    title: string,
    content: string,
    createdOn: string
}

export interface CreatePostRequest {
    userId: string,
    title: string,
    content: string
}
