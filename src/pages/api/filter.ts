import prisma from "@/src/lib/prisma";
import { queryToStringOnly } from "@/src/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "GET") {
        res.status(405).end();
    }

    try {
        const categories = queryToStringOnly(req.query.q).split(',');

        // WORKAROUND: prisma doesnt allow dynamically generating the 'where' filter. I hate this but it's easier than using a raw query
        const result = categories[0] === ''
            ? await prisma.post.findMany({
                where: {
                    published: true
                },
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    category: true
                },
            })
            : await prisma.post.findMany({
                where: {
                    category: {
                        name: {
                            in: categories,
                            mode: "insensitive"
                        },
                    },
                    published: true
                },
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    category: true
                },
            });

        res.status(200).json(result);
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.statusCode).send(e.message);

            return;
        }

        res.status(500).send("Internal server error");
        console.log(e);
    }
}