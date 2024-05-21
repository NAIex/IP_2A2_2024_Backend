import prisma from "../../prisma/index.js";

export const getUserFeed = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userCommunities = await prisma.communityUser.findMany({
      where: { user_id: userId },
      select: { community_id: true },
    });

    const communityIds = userCommunities.map((c) => c.community_id);

    const threads = await prisma.communityThread.findMany({
      where: {
        community_id: { in: communityIds },
      },
    });
    const threadsIds = threads.map((thread) => thread.thread_id);

    const recentThreads = await prisma.thread.findMany({
      where: {
        id: { in: threadsIds },
        // is_archived: false,
      },
      orderBy: { creation_time: "desc" },
    });

    res.status(200).json(recentThreads);
  } catch (e) {
    res.status(500).json(e);
  }
};
