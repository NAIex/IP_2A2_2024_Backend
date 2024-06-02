import createError from "http-errors";
import prisma from "../../prisma/index.js";

class BanService {

    static async viewBannedUsers() {
        const allUsers = await prisma.User.findMany({
            where: {
                ban_status: true,
            }
        });
        return allUsers;
    }

    static async viewBanCandidates() {
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

    static async unbanUser(userData) {
        const { id } = userData;

        let model = prisma.User;

        const user = await model.findUnique({
            where: { id: id },
        });

        if (!user) throw createError.NotFound('User not registered');

        if(user.ban_status == false) throw createError.NotFound('User is not banned');

        await model.update({
            where: { id: id },
            data: { 
                ban_status: false,
                unbanned_date: null 
            },
        });

        return user;
    }

    static async sendBanNotification(user_id) {
        return "I am " + user_id + " and I am banned BooHoo";
    }

    static async banUser(userData) {
        const { id } = userData;

        let model = prisma.User;

        const user = await model.findUnique({
            where: { id: id },
        });

        if(!user) throw createError.NotFound('User not registered');

        if(user.user_type == "admin") throw createError.NotFound('Admins cannot be banned');

        if(user.ban_status == true) throw createError.NotFound('User is already banned');

        const localTimeOffset = new Date().getTimezoneOffset();
        
        const unbanDate = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000) - (localTimeOffset * 60 * 1000));

        await model.update({
            where: { id: id },
            data: { 
                ban_status: true,
                warnings_count: 0,
                unbanned_date: unbanDate
            },
        });

        return user;
    }
}

export default BanService;