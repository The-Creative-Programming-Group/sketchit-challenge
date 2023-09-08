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
    numberOfPlayer: v.number(),
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    try {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Suggest ${args.numberOfPlayer} words  for an topic that is '${args.topic}'`,
      });

      // Pull the message content out of the response
      const words = response.choices[0]?.text;
      // save the words and the topic into the database
      if (words && words.length > 0) {
        await ctx.runMutation(api.player.startGames, {
          topic: args.topic,
          words: words,
          roomId: args.roomId,
        });
        return words;
      } else {
        console.error("The Open AI return nothing");
      }
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error.status); // e.g. 401
        console.error(error.message); // e.g. The authentication token you passed was invalid...
        console.error(error.code); // e.g. 'invalid_api_key'
        console.error(error.type); // e.g. 'invalid_request_error'
      } else {
        // Non-API error
        console.log(error);
      }
    }
  },
});
