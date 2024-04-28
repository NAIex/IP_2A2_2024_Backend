import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import jwt from "../utils/jwt.js";
import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { promises as fsPromises } from 'fs';

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

    // static async verifyUser(email, password) {
    //     const user = User.find(user => user.email === email);
    //     if (!user) return null;
    //     const valid = await bcrypt.compare(password, user.password);
    //     return valid ? user : null;
    // }

    // static generateToken(user) {
    //     return jwt.sign(
    //         { userId: user.id, email: user.email },
    //         process.env.JWT_TOKEN,
    //         { expiresIn: '1h' }
    //     );
    // }

    static async login(userData) {
        const { email, password, chosenName } = userData;
        let isAdmin = false;

        if (email === ("aot.admin1@gmail.com") || email === ("aot.admin2@gmail.com") || email === ("aot.admin3@gmail.com")) {
            isAdmin = true;
        } else if (email.endsWith("@info.uaic.ro") || email.endsWith("@uaic.ro") || email.endsWith("@student.uaic.ro")) {
            isAdmin = false;
        } else { throw createError.NotFound('Email format not recognized'); }

        const user = await prisma.User.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        let checkPassword;
        if (isAdmin) {
            checkPassword = password === user.password;
        } else {
            checkPassword = await bcrypt.compare(password, user.password);
        }

        if (isAdmin && chosenName) {
            throw createError.BadRequest('Admins cannot use random names');
        } else if (!isAdmin && chosenName) {
            await AuthService.assignRandomName(user.id, chosenName);
        } else if(!isAdmin && chosenName == null){
            throw createError.BadRequest('Name must be provided');
        }

        await prisma.User.update({
            where: { email: email },
            data: { log_status: true },
        });

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    static async assignRandomName(userId, chosenName) {

        const existingUser = await prisma.User.findFirst({
            where: { random_name: chosenName }
        });

        if (existingUser) {
            throw createError.Conflict('This name is already taken');
        }

        const updatedUser = await prisma.User.update({
            where: { id: userId },
            data: { random_name: chosenName }
        });

        return updatedUser;
    }

    static getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    static async generateRandomName() {
        const data = await fsPromises.readFile(`/home/helio/Desktop/IP_2A2_2024_Backend/src/api/services/cuteNames.json`, 'utf8');
        const namesJson = JSON.parse(data);

        const namesList = [];

        for (let i = 0; i < 15; i++) {
            const formatChoice = Math.floor(Math.random() * 3);
            let name = '';

            if (formatChoice === 0) {
                name = this.getRandomElement(namesJson.X1) + this.getRandomElement(namesJson.A) + this.getRandomElement(namesJson.X3);
            } else if (formatChoice === 1) {
                name = this.getRandomElement(namesJson.X1) + this.getRandomElement(namesJson.B) + this.getRandomElement(namesJson.X3);
            } else if (formatChoice === 2) {
                name = "Your" + this.getRandomElement(namesJson.C) + this.getRandomElement(namesJson.A) + this.getRandomElement(namesJson.X3);
            }

            name = name.replace(/The/g, '');

            namesList.push(name);
        }

        return namesList;
    }

    // just for testing, not the actual function
    static async logout(userData) {
        const { email } = userData;
        let isAdmin = false;

        if (email === ("aot.admin1@gmail.com") || email === ("aot.admin2@gmail.com") || email === ("aot.admin3@gmail.com")) {
            isAdmin = true;
        } else if (email.endsWith("@info.uaic.ro") || email.endsWith("@uaic.ro") || email.endsWith("@student.uaic.ro")) {
            isAdmin = false;
        } else { throw createError.NotFound('Email format not recognized'); }

        const user = await prisma.User.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw new Error('User not found');
        }

        await prisma.User.update({
            where: { email: email },
            data: { log_status: false, random_name: null },
        });

        return { message: "Successfully logged out" };
    }

    static async all() {
        const allUsers = await prisma.User.findMany();
        return allUsers;
    }
}

export default AuthService