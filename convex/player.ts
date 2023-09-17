import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// start a game
export const startGames = mutation({
  args: { topic: v.string(), words: v.string(), roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.roomId, {
      topic: args.topic,
      words: args.words,
    });
    // update the player who in this room
    const playerList = await ctx.db
      .query("player")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .collect();
    for (let i = 0; i < playerList.length; i++) {
      const player = playerList[i];
      if (player) {
        await ctx.db.patch(player._id, { roomId: args.roomId, score: 0 });
      } else {
        console.error("The data error");
      }
    }
  },
});

// check the user's word is correct or not
export const checkWordFromUser = mutation({
  args: {
    playerId: v.id("player"),
    wordFromUser: v.string(),
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    // Update the score
    if (room?.words?.includes(args.wordFromUser)) {
      const player = await ctx.db.get(args.playerId);
      const newScore = player?.score ? player?.score + 1 : 1;
      ctx.db.patch(args.playerId, { score: newScore });
    }
  },
});

// get all the players in a room
export const getPlayersByRoomId = query({
  args: { _id: v.id("rooms") },
  handler: async (ctx, args) => {
    await ctx.db
      .query("player")
      .filter((q) => q.eq(q.field("roomId"), args._id))
      .collect();
  },
});
