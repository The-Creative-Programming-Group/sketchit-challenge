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

// invent somebody to room
export const invent = mutation({
  args: { username: v.string(), roomId: v.id("rooms") },
  handler: async (ctx, args) => {
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
