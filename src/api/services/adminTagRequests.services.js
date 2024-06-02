import bcrypt from "bcryptjs";
import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { notifType } from "@prisma/client";

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
            where: { name: tag.tagName},
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

        this.sendTagRequestNotification(tag.userId, notifType.TAG_REQ_ACCEPTED, tag.tagName);

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

        this.sendTagRequestNotification(tag.userId, notifType.TAG_REQ_REJECTED, tag.tagName);
    }

    static async sendTagRequestNotification(user_id, notification_type, tag_name) {
        const localTimeOffset = new Date().getTimezoneOffset();
        
        const creationDate = new Date(new Date().getTime() - (localTimeOffset * 60 * 1000));

        const newNotification = await prisma.Notification.create({
            data: {
                user_ID: user_id,
                type: notification_type,
                tagName: tag_name,
                time_sent: creationDate,
            },
        })

        return newNotification;
    }
}

export default adminTagRequestsService