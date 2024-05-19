import { response } from "express";
import prisma from "../../prisma/index.js";

export const getCommunity = async (req, res) => {
  const communities = await prisma.community.findMany();
  res.send(communities);
};

export const getUserCommunity = async (req, res) => {
  const communities = await prisma.communityUser.findMany();
  res.send(communities);
};

export const addCommunity = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId;
  console.log("id: " + userId);
  try {
    const community = await prisma.community.create({
      data: { author_id: userId, name, description },
    });
    res.status(201).send("Successfully created community");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const removeCommunity = async (req, res) => {
  const { removeCommunityId } = req.body;
  try {
    const userId = req.user.userId;

    const communityExists = await prisma.community.findUnique({
      where: { id: removeCommunityId },
    });
    if (!communityExists) {
      res.status(404).send("Community does not exist");
      return;
    }

    const userIsAuthor = await prisma.community.findUnique({
      where: { id: removeCommunityId, author_id: userId },
    });

    if (!userIsAuthor && !req.user.isAdmin) {
      res.status(401).send("Unauthorized");
      return;
    }

    const community = await prisma.community.delete({
      where: { id: removeCommunityId },
    });
    const deleteCommunityUsers = await prisma.communityUser.deleteMany({
      where: { community_id: removeCommunityId },
    });

    res.status(204).send("Successfully removed community");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const addUserToCommunity = async (req, res) => {
  const { communityId } = req.body;
  const userId = req.user.userId;

  try {
    const communityExists = await prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!communityExists) {
      res.status(404).send("Community does not exist");
      return;
    }
    const user = await prisma.communityUser.create({
      data: { user_id: userId, community_id: communityId },
    });
    res.status(201).send("Successfully added user to community");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const removeUserFromCommunity = async (req, res) => {
  const { userToRemoveId, communityId } = req.body;
  const userId = req.user.userId;

  try {
    const userToRemoveExists = await prisma.user.findUnique({
      where: { id: userToRemoveId },
    });
    if (!userToRemoveExists) {
      res.status(404).send("User to remove does not exist");
      return;
    }
    const communityExists = await prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!communityExists) {
      res.status(404).send("Community does not exist");
      return;
    }

    const userIsAuthor = await prisma.community.findUnique({
      where: { id: communityId, author_id: userId },
    });
    if (!userIsAuthor && userId != userToRemoveId && !req.user.isAdmin) {
      res.status(401).send("Unauthorized");
      return;
    }

    const userDeleted = await prisma.communityUser.deleteMany({
      where: { user_id: userToRemoveId, community_id: communityId },
    });
    if (userDeleted.count === 0) {
      res
        .status(404)
        .send("No user found in the community with the provided IDs");
      return;
    }
    res.status(204).send("Successful removal of the user from the community");
  } catch (e) {
    res.status(500).json(e);
  }
};
