import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import createError from "http-errors";
import prisma from "../../prisma/index.js";

class MuteService {

    static async viewMutedUsers() {
        const allUsers = await prisma.User.findMany({
            where: {
                mute_status: true,
            }
        });
        return allUsers;
    }

    static async viewMuteCandidates() {
        const allUsers = await prisma.User.findMany({
            where: {
                warnings_count: { gt: 0 }
            },
            orderBy: {
                warnings_count: 'desc'
            }
        });
        return allUsers;
    }

    static async unmuteUser(userData) {
        const { id } = userData;

        let model = prisma.User;

        const user = await model.findUnique({
            where: { id: id },
        });

        if (!user) throw createError.NotFound('User not registered');

        if(user.mute_status == false) return { message: "User is not muted" };

        await model.update({
            where: { id: id },
            data: { 
                mute_status: false,
                unmute_date: null 
            },
        });

        this.sendMuteNotification(user.id, "unmute");

        return { message: "User unmuted succesfully" };
    }

    static async sendMuteNotification(user_id, notification_type) {
        const localTimeOffset = new Date().getTimezoneOffset();
        
        const creationDate = new Date(new Date().getTime() - (localTimeOffset * 60 * 1000));

        const newNotification = await prisma.Notification.create({
            data: {
                user_ID: user_id,
                type: notification_type,
                time_sent: creationDate,
            },
        })

        return newNotification;
    }

    static async muteUser(userData) {
        const { id } = userData;

        let model = prisma.User;

        const user = await model.findUnique({
            where: { id: id },
        });

        if(!user) throw createError.NotFound('User not registered');

        if(user.user_type == "admin") throw createError.BadRequest('Admins cannot be muted');

        if(user.mute_status == true) return { message: "User already muted" };

        const localTimeOffset = new Date().getTimezoneOffset();
        
        const unmuteDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000) - (localTimeOffset * 60 * 1000));

        await model.update({
            where: { id: id },
            data: { 
                mute_status: true,
                unmute_date: unmuteDate,
		        warnings_count: { increment: 1 }
            },
        });

        this.sendMuteNotification(user.id, "mute");

        return { message: "User muted succesfully." };
    }
}

export default MuteService