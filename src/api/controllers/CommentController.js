import prisma from "../../prisma/index.js";

export const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.send(comments);
};

export const getThreadDirectComments = async (req, res) => {
  const threadDirectComments = await prisma.ThreadDirectComments.findMany();
  res.send(threadDirectComments);
};

export const getCommentSubcomment = async (req, res) => {
  const commentsSubcomments = await prisma.CommentSubcomment.findMany();
  res.send(commentsSubcomments);
};

export const addDirectComment = async (req, res) => {
  const { content, threadId } = req.body;
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
      where: { id: threadId },
    });
    if (!threadExists) {
      res.status(404).send("Thread does not exist");
      return;
    }
    const communityThread = await prisma.communityThread.findUnique({
      where: { thread_id: threadId },
    });

    const userJoinCommunity = await prisma.communityUser.findMany({
      where: { user_id: userId, community_id: communityThread.community_id },
    });

    if (!userJoinCommunity.length) {
      res
        .status(401)
        .send("Permission denied! User is not a member of the community.");
      return;
    }

    const comment = await prisma.comment.create({
      data: { content, author_id: userId },
    });
    const directComment = await prisma.threadDirectComments.create({
      data: { thread_id: threadId, comment_id: comment.id },
    });

    res.status(201).send("Successfully add comment");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const addSubcomment = async (req, res) => {
  const { content, commentId, threadId } = req.body;
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
    const commentExists = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!commentExists) {
      res.status(404).send("Comment does not exist");
      return;
    }
    const threadExists = await prisma.thread.findUnique({
      where: { id: threadId },
    });
    if (!threadExists) {
      res.status(404).send("Thread does not exist");
      return;
    }
    const communityThread = await prisma.communityThread.findMany({
      where: { thread_id: threadExists.id },
    });
    const userJoinCommunity = await prisma.communityUser.findMany({
      where: { user_id: userId, community_id: communityThread.id },
    });
    if (!userJoinCommunity.length) {
      res
        .status(401)
        .send("Permission denied! User is not a member of the community.");
      return;
    }
    const comment = await prisma.comment.create({
      data: { content, author_id: userId },
    });
    const subcomment = await prisma.CommentSubcomment.create({
      data: { comment_id: commentId, subcomment_id: comment.id },
    });

    res.status(201).send("Successfully add comment");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
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

    const commentExists = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!commentExists) {
      res.status(404).send("Comment does not exist");
      return;
    }

    const userIsAuthor = await prisma.comment.findUnique({
      where: { id: commentId, author_id: userId },
    });

    if (!userIsAuthor && !req.user.isAdmin) {
      res.status(401).send("Unauthorized");
      return;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { deleted: true },
    });

    res.status(204).send("Successfully removed comment");
  } catch (e) {
    res.status(500).json(e);
  }
};


export const likeComment = async (req, res) => {
  const { commentId } = req.body;
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

    const commentExists = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!commentExists) {
      res.status(404).send("Comment does not exist");
      return;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { like: { increment: 1}},
    });

    res.status(204).send("Successfully liked the comment");
  } catch (e) {
    res.status(500).json(e);
  }
};


