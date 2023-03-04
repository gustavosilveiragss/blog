//https://github.com/prisma/prisma/discussions/10928#discussioncomment-1920961
import { Prisma } from '@prisma/client'

export type PostWithCategory = Prisma.PostGetPayload<{
    include: { category: true }
}>

export type PostWithAuthorCategory = Prisma.PostGetPayload<{
    include: {
        author: true,
        category: true
    },
}>