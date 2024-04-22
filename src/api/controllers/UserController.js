import prisma from "../../prisma/index.js";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
};
