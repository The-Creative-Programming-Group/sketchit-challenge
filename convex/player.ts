import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// start a game
export const startGames = mutation({
    args: { topic: v.string(), words: v.string(), roomId: v.id("rooms") },
    handler: async (ctx, args) => {
        const gameId = await ctx.db.insert("games", { topic:args.topic, words:args.words });
        // update the player who in this room
        const playerList = await ctx.db.query("player").filter((q) => q.eq(q.field('roomId'), args.roomId)).collect();
        for (let i = 0; i < playerList.length; i++) {
            await ctx.db.patch(playerList[i]?._id, { gameId: gameId, score: 0 })
        }
    },
});


// update the player score
export const updateScore = mutation({
    args: { _id: v.id("player"), score: v.number() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args._id, { score: args.score })
    }
})

// get all the players in a room
export const getPlayersByRoomId = query({
    args: { _id: v.id("rooms") },
    handler: async (ctx, args) => {
        await ctx.db.query("player").filter((q) => q.eq(q.field('roomId'), args._id)).collect();
    }
})