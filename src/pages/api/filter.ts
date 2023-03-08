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
        
        const result = await prisma.post.findMany({
            where: {
                category: {
                    name: {
                        in: categories,
                        mode: "insensitive"
                    },
                }
            }
        });

        res.status(200).json(result);
        // TODO: Each child in a list should have a unique "key" prop.
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.statusCode).send(e.message);

            return;
        }

        res.status(500).send("Internal server error");
        console.log(e);
    }
}