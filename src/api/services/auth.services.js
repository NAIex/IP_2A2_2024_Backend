import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { promises as fsPromises } from 'fs';

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
        const { email, password, chosenName } = userData;
        let isAdmin = false;

        if (["aot.admin1@gmail.com", "aot.admin2@gmail.com", "aot.admin3@gmail.com"].includes(email)) {
            isAdmin = true;
        } else if (email.endsWith("@info.uaic.ro") || email.endsWith("@uaic.ro") || email.endsWith("@student.uaic.ro")) {
            isAdmin = false;
        } else {
            throw createError.NotFound('Email format not recognized');
        }

        const user = await prisma.User.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        let checkPassword = isAdmin ? (password === user.password) : await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw createError.Unauthorized('Invalid password');
        }

        if (isAdmin && chosenName) {
            throw createError.BadRequest('Admins cannot use random names');
        } else if (!isAdmin && chosenName) {
            await AuthService.assignRandomName(user.id, chosenName);
        } else if (!isAdmin && chosenName == null) {
            throw createError.BadRequest('Name must be provided');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, isAdmin: isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return { token, user: { ...user, password: undefined } };
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

        const data = await fsPromises.readFile('./src/api/services/cuteNames.json', 'utf8');
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

    static async all() {
        const allUsers = await prisma.User.findMany();
        return allUsers;
    }
}

export default AuthService