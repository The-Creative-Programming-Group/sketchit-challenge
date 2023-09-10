import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  player: defineTable({
    username: v.string(),
    roomId: v.id("rooms"),
    score: v.optional(v.number()),
  }),
  rooms: defineTable({
    roomName: v.string(),
    topic: v.optional(v.string()),
    words: v.optional(v.string()),
    chatEnabled: v.boolean(),
    timeLimit: v.number(),
    pairs: v.boolean()
  }),
  messages: defineTable({
    playerId: v.id("player"),
    roomId: v.id("rooms"),
    body: v.string(),
  }),
});
