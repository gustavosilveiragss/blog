import prisma from "@/src/lib/prisma";
import { queryToStringOnly } from "@/src/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "GET") {
        res.status(405).end();
    }

    try {
        const searchTerm = queryToStringOnly(req.query.q);

        // https://github.com/prisma/prisma/discussions/3159
        const result = await prisma.$queryRaw`SELECT * FROM "Post"
            WHERE LOWER("title") LIKE LOWER(${`${searchTerm}%`}) 
                OR LOWER("title") LIKE LOWER(${`% ${searchTerm}%`}) 
            ORDER BY "createdAt" DESC 
            LIMIT 5;
        `;

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