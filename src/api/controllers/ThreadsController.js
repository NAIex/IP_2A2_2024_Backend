import prisma from "../../prisma/index.js";
import { getUserId } from "./UserController.js";


export const addThreadToCommunity = async (req, res) => {
    const { communityId, name, description, type } = req.body;
    try {
        const userId = getUserId(req);
        
        const communityExists = await prisma.community.findUnique({
            where: { id: communityId },
        });

        if (!communityExists) {
            res.status(404).send("Community does not exist");
            return;
        }

        const thread = await prisma.thread.create({
            data: { name, type, description, owner_id: userId, is_archived: false, creation_time: new Date()}, });

        await prisma.communityThread.create({
            data: {
                thread_id: thread.id,
                community_id: communityId,
            },
        });

        res.status(201).send("Successfully added thread to community");
    } catch (error) {
        res.status(500).send("Failed to add thread to community");
    }
};
