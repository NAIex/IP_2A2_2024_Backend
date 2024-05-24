import prisma from "../../prisma/index.js";
export const getUserFeed = async (req, res) => {
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
    const userCommunities = await prisma.communityUser.findMany({
      where: { user_id: userId },
      select: { community_id: true },
    });

    const communityIds = userCommunities.map((c) => c.community_id);

    const communityThreads = await prisma.communityThread.findMany({
      where: {
        community_id: { in: communityIds },
      },
    });

    const threadsWithCommunityTitle = await Promise.all(
      communityThreads.map(async (communityThread) => {
        const thread = await prisma.thread.findUnique({
          where: { id: communityThread.thread_id },
        });
        const community = await prisma.community.findUnique({
          where: { id: communityThread.community_id },
          select: { name: true }, // Select only the community title
        });
        return {
          ...thread,
          communityTitle: community.name,
        };
      })
    );

    res.status(200).json(threadsWithCommunityTitle);
  } catch (e) {
    res.status(500).json(e);
  }
};
