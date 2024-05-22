import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import createError from "http-errors";
import prisma from "../../prisma/index.js";

class adminTagRequestsService {

    static async viewTagRequests() {
        const allTags = await prisma.TagRequest.findMany();
        return allTags;
    }

    static async approveTag(tagData) {
        const { id } = tagData;

        let model = prisma.TagRequest;

        const tag = await model.findUnique({
            where: { id: id },
        });

        if (!tag) throw createError.NotFound('Tag request not existent');

        const sameTag = await prisma.Tag.findUnique({
            where: { name:  tag.name}
        })

        if (sameTag) throw createError.Conflict('Tag already exists');

        let newTag = await prisma.Tag.create({
            data: {
                name: tag.tagName
            },
        })

        await model.delete({
            where: { id: id }
        });

        return newTag;
    }

    static async rejectTag(tagData) {
        const { id } = tagData;

        let model = prisma.TagRequest;

        const tag = await model.findUnique({
            where: { id: id },
        });

        if (!tag) throw createError.NotFound('Tag request not existent');

        await model.delete({
            where: { id: id }
        });

        return newTag;
    }
}

export default adminTagRequestsService