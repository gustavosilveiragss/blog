import { Category, Post, User } from './models'

export interface PostWithCategory extends Post {
    category: Category
}

export interface PostWithAuthorCategory extends Post {
    category: Category,
    author: User
}