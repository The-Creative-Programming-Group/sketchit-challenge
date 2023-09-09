import { proxy } from "valtio";

export const roomSetting = proxy({
  chat: false,
  pairplay: false,
  timeLimit: 600,
  setChat: (value: boolean) => (roomSetting.chat = value),
  setPairplay: (value: boolean) => (roomSetting.pairplay = value),
  setTimeLimit: (value: number) => (roomSetting.timeLimit = value),
});
