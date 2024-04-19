// export const getUser = (req,res)=>{
//     const { id, user_type } = req.body;
//     res.send(`${req.body.user_type}`);
// }
import prisma from "../../prisma/index.js";

export const getUsers = async (req, res) => {

    const users = await prisma.users.findMany();
    res.send(users);
}