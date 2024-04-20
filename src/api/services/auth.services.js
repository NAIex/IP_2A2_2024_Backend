import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import createError from "http-errors";

import prisma from "../../prisma/index.js";

class AuthService {

    // static async register(userData) {
    //     // const { email } = data.email;
    //     // const { password } = data.password;
    //     // let user = await prisma.User.create({ data });
    //     const hashed = await bcrypt.hash(userData.password, 10);

    //     let newUser = await prisma.User.create({
    //         data: {
    //             email: userData.email,
    //             password: hashed
    //         },
    //     })

    //     return newUser;
    // }

    static async register(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
    
        let newUser = await prisma.User.create({
            data: {
                email: userData.email,
                password: hashedPassword
            },
        })
    
        return newUser;
    }

    static async login(userData) {
        const { email, password } = userData;
    
        const user = await prisma.User.findUnique({
            where: { email: email },
        });
    
        if (!user) throw createError.NotFound('User not registered');

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');
    
        await prisma.User.update({
            where: { email: email },
            data: { log_status: true },
        });
    
        const { password: _, ...userWithoutPassword } = user;
    
        return userWithoutPassword;
    }

    static async logout(userData) {
        const { email } = userData;
    
        const user = await prisma.User.findUnique({
            where: { email: email },
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        await prisma.User.update({
            where: { email: email },
            data: { log_status: false },
        });
    
        return { message: "Successfully logged out" };
    }
    
    
    static async all() {
        const allUsers = await prisma.users.findMany();
        return allUsers;
    }
}

export default AuthService