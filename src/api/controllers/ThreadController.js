import prisma from "../../prisma/index.js";

export const getThreads = async (req, res) => {
  const threads = await prisma.Thread.findMany();
  res.send(threads);
};

export const getThreadCommunity = async (req, res) => {
  const threadCommunity = await prisma.CommunityThread.findMany();
  res.send(threadCommunity);
};

export const addThread = async (req, res) => {
  const { name, description, communityId, type } = req.body;
  const userId = req.user.userId;
  const userEmail = req.user.email;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId, email: userEmail },
    });
    if (!user) {
      res.status(404).send("User does not exist");
      return;
    }
    const communityExists = await prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!communityExists) {
      res.status(404).send("Community does not exist");
      return;
    }
    const thread = await prisma.Thread.create({
      data: { owner_id: userId, name, description, type },
    });
    const threadCommunity = await prisma.CommunityThread.create({
      data: { community_id: communityId, thread_id: thread.id },
    });

    res.status(201).send("Successfully add thread");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const removeThread = async (req, res) => {
  const { removeThreadId } = req.body;
  const userId = req.user.userId;
  const userEmail = req.user.email;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId, email: userEmail },
    });
    if (!user) {
      res.status(404).send("User does not exist");
      return;
    }
    const threadExists = await prisma.thread.findUnique({
      where: { id: removeThreadId },
    });
    if (!threadExists) {
      res.status(404).send("Thread does not exist");
      return;
    }

    const userIsAuthor = await prisma.thread.findUnique({
      where: { id: removeThreadId, owner_id: userId },
    });

    if (!userIsAuthor && !req.user.isAdmin) {
      res.status(401).send("Unauthorized");
      return;
    }

    const thread = await prisma.thread.delete({
      where: { id: removeThreadId },
    });
    const deleteThreadCommunity = await prisma.CommunityThread.deleteMany({
      where: { thread_id: removeThreadId },
    });

    res.status(204).send("Successfully removed thread");
  } catch (e) {
    res.status(500).json(e);
  }
};
