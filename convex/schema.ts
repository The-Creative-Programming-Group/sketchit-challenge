import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    games: defineTable({
        topic: v.string(),
        words: v.string(),
    }),
    rooms: defineTable({
        roomName:v.string(),
    })
});
