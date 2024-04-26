import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import createError from "http-errors";
import prisma from "../../prisma/index.js";

class AuthService {

    static async register(userData) {
        const { email, password } = userData;

        const studentFormat = /^([a-z])+\.([a-z])+@student\.uaic\.ro$/;

        const professorFormat = /^([a-z])+\.([a-z])+((@info\.uaic\.ro)|(@uaic\.ro))$/;

        const validStudentEmail = studentFormat.test(email);

        const validProfessorEmail = professorFormat.test(email);

        if(!validStudentEmail && !validProfessorEmail) {

            const domainCheck = /^.*(@student\.uaic\.ro)|(@info\.uaic\.ro)|(@uaic\.ro)$/;

            if(!domainCheck.test(email)) {
                throw createError.BadRequest('Email domain has to follow one of these formats:\nfor students - @student.uaic.ro\nfor professors - @info.uaic.ro or @uaic.ro');
            }

            throw createError.BadRequest('Invalid email name or email does not exist');
        }

        let userType;

        if(!validStudentEmail)
            userType = "professor";
        else userType = "student";

        const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,20}$/;

        const validPassword = passwordFormat.test(password);

        if(!validPassword) {
            const passwordErrors = [];

            if (!/(?=.*[a-z])/.test(password)) {
                passwordErrors.push('Password must contain at least one lowercase letter');
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                passwordErrors.push('Password must contain at least one uppercase letter');
            }
            if (!/(?=.*\d)/.test(password)) {
                passwordErrors.push('Password must contain at least one digit');
            }
            if (!/(?=.*[\W_])/.test(password)) {
                passwordErrors.push('Password must contain at least one special character');
            }
            if (!/.{10,20}/.test(password)) {
                passwordErrors.push('Password must be between 10 and 20 characters long');
            }
            throw createError.BadRequest(`\n${passwordErrors.join('\n')}`);
        } 

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