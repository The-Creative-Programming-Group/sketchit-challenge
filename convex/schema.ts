import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  games: defineTable({
    topic: v.string(),
    words: v.optional(v.string()),
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
  messages: defineTable({
    playerId: v.id("player"),
    roomId: v.id("rooms"),
    body: v.string(),
  }),
});
