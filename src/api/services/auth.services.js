import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import createError from "http-errors";
import prisma from "../../prisma/index.js";

class AuthService {

    static async register(userData) {
        const { email, password } = userData;

        const studentFormat = /^([a-z])+\.([a-z])+@student\.uaic\.ro$/;

        let userType = "student";

        const validStudentEmail = studentFormat.test(email);

        if (!validStudentEmail) {

            userType = "professor";

            const professorFormat = /^([a-z])+\.([a-z])+((@info\.uaic\.ro)|(@uaic\.ro))$/;

            const validProfessorEmail = professorFormat.test(email);

            if (!validProfessorEmail) throw createError.BadRequest('Invalid email');
        }

        const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,20}$/;

        const validPassword = passwordFormat.test(password);

        if (!validPassword) throw createError.BadRequest('Invalid password');

        const user = await prisma.User.findUnique({
            where: { email: email },
        });

        if (user) throw createError.Forbidden('Email already used');

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        let newUser = await prisma.User.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                user_type: userType
            },
        })

        return newUser;
    }

    static async login(userData) {
        const { email, password } = userData;

        let model;
        if (email.endsWith("@admin.uaic.ro")) {
            model = prisma.Admin;
        } else if (email.endsWith("@info.uaic.ro") || email.endsWith("@uaic.ro") || email.endsWith("@student.uaic.ro")) {
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