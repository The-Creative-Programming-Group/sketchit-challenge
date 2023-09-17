import { proxy } from "valtio";
import { Id } from "../../convex/_generated/dataModel";

export const state = proxy({
  playerId: "",
  setPlayerId: (id: string) => {
    state.playerId = id;
  },

  user: "",
  setUsername: (username: string) => {
    state.user = username;
  },
});
