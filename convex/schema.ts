import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  games: defineTable({
    topic: v.string(),
    words: v.string(),
  }),
  player: defineTable({
    username: v.string(),
    roomId: v.id("rooms"),
    gameId: v.optional(v.id("games")),
    score: v.optional(v.number()),
  }),
  rooms: defineTable({
    roomName: v.string(),
  }),
});
