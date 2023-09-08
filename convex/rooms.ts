import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// create room
export const createRoom = mutation({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const roomName = args.username + "'s Room";
    const roomId = await ctx.db.insert("rooms", { roomName });
    const playerId = await ctx.db.insert("player", {
      username: args.username,
      roomId: roomId,
    });
    return { playId: playerId, roomId: roomId };
  },
});

// let somebody join  into room
export const join = mutation({
  args: { username: v.string(), roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("player")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .collect();
    if (players.length > 8) {
      return {
        message: "The backend got an error",
        error: "the maxinum of a room is 8!",
      };
    }
    await ctx.db.insert("player", {
      username: args.username,
      roomId: args.roomId,
    });
    return ctx.db
      .query("player")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .collect();
  },
});
