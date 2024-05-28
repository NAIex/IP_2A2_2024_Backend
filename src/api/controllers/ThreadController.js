import prisma from "../../prisma/index.js";

export const getThreads = async (req, res) => {
  const { id } = req.query;
  const userId = req.user.userId;
  const userEmail = req.user.email;
  let data;
  try {
    if (id) {
      const threadId = Number(id);
      const user = await prisma.user.findUnique({
        where: { id: userId, email: userEmail },
      });
      if (!user) {
        res.status(404).send("User does not exist");
        return;
      }

      data = await prisma.thread.findUnique({
        where: { id: threadId },
      });
      if (!data) {
        res.status(404).send("Thread does not exist");
        return;
      }
      const community = await prisma.communityThread.findUnique({
        where: { thread_id: threadId },
      });

      const userJoinCommunity = await prisma.communityUser.findMany({
        where: { user_id: userId, community_id: community.community_id },
      });
      if (!userJoinCommunity.length) {
        res
          .status(401)
          .send("Permission denied! User is not a member of the community.");
        return;
      }
      const communityName = await prisma.community.findUnique({
        where: { id: community.community_id },
        select: { name: true },
      });
      data = { ...data, communityTitle: communityName.name };
    } else {
      data = await prisma.thread.findMany();
    }
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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
    const userJoinCommunity = await prisma.communityUser.findMany({
      where: { user_id: userId, community_id: communityId },
    });
    if (!userJoinCommunity.length) {
      res
        .status(401)
        .send("Permission denied! User is not a member of the community.");
      return;
    }
    const thread = await prisma.thread.create({
      data: { owner_id: userId, name, description, type },
    });
    const threadCommunity = await prisma.communityThread.create({
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
    const deleteThreadCommunity = await prisma.communityThread.deleteMany({
      where: { thread_id: removeThreadId },
    });

    res.status(204).send("Successfully removed thread");
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getDirectComments = async (req, res) => {
  const threadId = Number(req.params.id);
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

    let data = await prisma.thread.findUnique({
      where: { id: threadId },
    });
    if (!data) {
      res.status(404).send("Thread does not exist");
      return;
    }
    const community = await prisma.communityThread.findUnique({
      where: { thread_id: threadId },
    });

    const userJoinCommunity = await prisma.communityUser.findMany({
      where: { user_id: userId, community_id: community.community_id },
    });
    if (!userJoinCommunity.length) {
      res
        .status(403)
        .send("Permission denied! User is not a member of the community.");
      return;
    }
    const commentsThread = await prisma.threadDirectComments.findMany({
      where: { thread_id: threadId },
      select: { comment_id: true },
    });

    const commentIds = commentsThread.map((c) => c.comment_id);
    data = await prisma.comment.findMany({
      where: {
        id: { in: commentIds },
      },
      orderBy: {
        creation_time: "desc",
      },
    });

    res.send(data);
  } catch (e) {
    res.status(500).json(e);
  }
};
