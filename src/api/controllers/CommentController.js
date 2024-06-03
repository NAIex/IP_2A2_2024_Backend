import prisma from "../../prisma/index.js";
import { notifType } from "@prisma/client";

export const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.send(comments);
};

export const getThreadDirectComments = async (req, res) => {
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
      const commentsThread = await prisma.threadDirectComments.findMany({
        where: { thread_id: threadId },
        select: { comment_id: true },
      });

      const commentIds = commentsThread.map((c) => c.comment_id);
      data = await prisma.comment.findMany({
        where: {
          id: { in: commentIds },
        },
      });
    } else {
      data = await prisma.threadDirectComments.findMany();
    }
    res.send(data);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getCommentSubcomment = async (req, res) => {
  const { id } = req.query;
  const userId = req.user.userId;
  const userEmail = req.user.email;
  let data;
  try {
    if (id) {
      const commentId = Number(id);
      const user = await prisma.user.findUnique({
        where: { id: userId, email: userEmail },
      });
      if (!user) {
        res.status(404).send("User does not exist");
        return;
      }

      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        res.status(404).send("Comment does not exist");
        return;
      }
      const thread = await prisma.threadDirectComments.findUnique({
        where: { comment_id: commentId },
      });

      const community = await prisma.communityThread.findUnique({
        where: { thread_id: thread.thread_id },
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
      const subcommentsComment = await prisma.commentSubcomment.findMany({
        where: { comment_id: commentId },
        select: { subcomment_id: true },
      });

      const subcommentIds = subcommentsComment.map((c) => c.subcomment_id);
      data = await prisma.comment.findMany({
        where: {
          id: { in: subcommentIds },
        },
      });
    } else {
      data = await prisma.commentSubcomment.findMany();
    }
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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

    const notification = await prisma.notification.create({
      data: {
        user_ID: threadExists.owner_id,
        type: notifType.COMMENT_ADDED,
        threadName: threadExists.name,
        commentContent: content,
      },
    });
    res
      .status(201)
      .send({ message: "Successfully add comment", id: comment.id });
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
    const commenThreadtExists = await prisma.threadDirectComments.findUnique({
      where: { thread_id: threadId, comment_id: commentId },
    });
    if (!commentExists || !commenThreadtExists) {
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

    const notification = await prisma.notification.create({
      data: {
        user_ID: threadExists.owner_id,
        type: notifType.COMMENT_ADDED,
        threadName: threadExists.name,
        commentContent: content,
      },
    });
    res
      .status(201)
      .send({ message: "Successfully add subcomment", id: comment.id });
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
