import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import createError from "http-errors";
import prisma from "../../prisma/index.js";

class AuthService {

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

        let model;
        if (email.endsWith("@admin.uaic.ro")) {
            model = prisma.Admin;
        } else if (email.endsWith("@profesor.uaic.ro") || email.endsWith("@student.uaic.ro")) {
            model = prisma.User;
        } else {
            throw createError.NotFound('Email format not recognized');
        }

        const user = await model.findUnique({
            where: { email: email },
        });

        if (!user) throw createError.NotFound('User not registered');

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');

        await model.update({
            where: { email: email },
            data: { log_status: true },
        });

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    // just for testing, not the actual function

    static async logout(userData) {
        const { email } = userData;

        let model;
        if (email.endsWith("@admin.uaic.ro")) {
            model = prisma.Admin;
        } else if (email.endsWith("@profesor.uaic.ro") || email.endsWith("@student.uaic.ro")) {
            model = prisma.User;
        } else {
            throw createError.NotFound('Email format not recognized');
        }
    
        const user = await model.findUnique({
            where: { email: email },
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        await model.update({
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