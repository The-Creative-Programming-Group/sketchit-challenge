import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    // Grab the most recent messages.
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .order("desc")
      .collect();
    // Reverse the list so that it's in a chronological order.
    const messageWithUsername = await Promise.all(
      messages.map(async (message) => {
        // Find the likes for each message
        const player = await ctx.db.get(message.playerId);
        // Join the count of likes with the message data
        return {
          ...message,
          // Format smileys
          username: player?.username,
        };
      }),
    );
    // Reverse the list so that it's in chronological order.
    return messageWithUsername.reverse();
  },
});

export const send = mutation({
  args: { body: v.string(), playerId: v.id("player"), roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    // Send a new message.
    await ctx.db.insert("messages", {
      body: args.body,
      playerId: args.playerId,
      roomId: args.roomId,
    });
  },
});
