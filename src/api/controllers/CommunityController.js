import { response } from "express";
import prisma from "../../prisma/index.js";

export const getCommunity = async (req, res) => {
  const communities = await prisma.community.findMany();
  res.send(communities);
};

export const addCommunity = async (req, res) => {
  const { name, description } = req.body;
  try {
    const community = await prisma.community.create({
      data: { name, description },
    });
    res.status(201).send("Successfully created");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const removeCommunity = async (req, res) => {
  const { id } = req.body;
  try {
    const community = await prisma.community.delete({ where: { id } });
    res.status(204).send("Successfully removed");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const addUserToCommunity = async (req, res) => {
  const { user_id, community_id } = req.body;

  try {
    const user_exists = await prisma.user.findUnique({
      where: { id: user_id },
    });
    const community_exists = await prisma.community.findUnique({
      where: { id: community_id },
    });
    if (!user_exists || !community_exists) {
      res.status(404).send("Data [user_id, community_id] not found");
      return;
    }
    const user = await prisma.communityUser.create({
      data: { user_id, community_id },
    });
    res.status(204).send("Successfully add");
  } catch (e) {
    res.status(500).json(e);
  }
};
