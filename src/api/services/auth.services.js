import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";

import prisma from "../../prisma/index.js";

// require('dotenv').config();

class AuthService {

    static async register(data) {
        const datax = { name: "testname",
                        password: "passtest",
                        email: "testemail@gmail.com"
                         }
        const user = await prisma.users.create({data: datax});
        return user;
        // data.name = "Marius";
        // const { email } = data;
        // data.password = bcrypt.hashSync(data.password, 8);
        // let user = prisma.users.create({
        //     data
        // })
        // data.accessToken = await jwt.signAccessToken(user);

        // return data;
    }

    static async login(data) {
        const { email, password } = data;
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }

    static async all() {
        const allUsers = await prisma.users.findMany();
        return allUsers;
    }
}

export default AuthService