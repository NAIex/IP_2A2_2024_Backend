import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
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

    //Functia viewBanCandidates afiseaza exact ca viewBannedUsers momentan

    static async viewBanCandidates() {
        const allUsers = await prisma.User.findMany({
            where: {
                ban_status: true,
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

        if(user.ban_status == false) return { message: "User is not banned" };

        await model.update({
            where: { id: id },
            data: { ban_status: false },
        });

        return { message: "User unbanned succesfully" };
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

        if (!user) throw createError.NotFound('User not registered');

        if(user.ban_status == true) return { message: "User already banned" };

        await model.update({
            where: { id: id },
            data: { ban_status: true },
        });

        return { message: "User banned succesfully. Message sent: " + await this.sendBanNotification(user.id)};
    }
}

export default BanService