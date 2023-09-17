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
      const checkTopicResponse = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Is the topic ${args.topic} good?
                 A good topic must be a single or two-word topic like 'animal', 'plants', 'cars', 'celebrities', etc.
                 Also, a good topic must be a topic from which other words that can be drawn can be found.
                 Anything that can be suitable for all audiences.
                 A bad topic is something sexual or harassing or something like "hello" is also a bad topic.
                 Your answer should just be true or false.`,
      });

      if (checkTopicResponse.choices[0]?.text.includes("false")) {
        return {
          message: "The backend got an error: It's a bad topic!",
        };
      }

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
        return {
          message:
            "The backend got an error: The maximum amount of users is 8!",
        };
      }
    } catch (error: unknown) {
      if (error instanceof OpenAI.APIError) {
        console.error("Status", error.status); // e.g. 401
        console.error("Message", error.message); // e.g. The authentication token you passed was invalid...
        console.error("Error Code", error.code); // e.g. 'invalid_api_key'
        console.error("Error Type", error.type); // e.g. 'invalid_request_error'
        return { message: "The backend got an error", error: error };
      } else {
        console.error(error);
        return { message: "The backend got an error", error: error };
      }
    }
  },
});
