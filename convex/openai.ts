"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "../convex/_generated/api";
import OpenAI from "openai";

// Initialize the OpenAI client with the given API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});
// start a game
export const startGames = action({
  args: {
    topic: v.string(),
    numberOfPlayer: v.int64(),
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Suggest ${args.numberOfPlayer} words  for an topic that is '${args.topic}'`,
    });

    // Pull the message content out of the response
    const words = response.choices[0].text;
    // save the words and the topic into the database
    await ctx.runMutation(api.player.startGames, {
      topic: args.topic,
      words: words,
      roomId: args.roomId,
    });
    return words;
  },
});
