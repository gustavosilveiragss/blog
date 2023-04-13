//https://github.com/prisma/prisma/discussions/10928#discussioncomment-1920961
import { Category, Prisma } from '@prisma/client'
import { Post } from './models'

export interface PostWithCategory extends Post {
    category: Category
}

export type PostWithAuthorCategory = Prisma.PostGetPayload<{
    include: {
        author: true,
        category: true
    },
}>