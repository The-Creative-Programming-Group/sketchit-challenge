import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


// Why is there a different schema for game and room??? -  Jakob
export default defineSchema({
  games: defineTable({
    topic: v.string(),
    words: v.optional(v.string()),
    // timeLimit: v.number(), IDEA?
  }),
  player: defineTable({
    username: v.string(),
    roomId: v.id("rooms"),
    gameId: v.optional(v.id("games")),
    score: v.optional(v.number()),
  }),
  rooms: defineTable({
    roomName: v.string(),
    // chatEnabled: v.boolean(), IDEA?
  }),
  messages: defineTable({
    playerId: v.id("player"),
    roomId: v.id("rooms"),
    body: v.string(),
  }),
});
