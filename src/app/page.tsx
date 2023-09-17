"use client";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Switch } from "~/ui/switch";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { SmallInput } from "~/ui/small-input";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { state } from "~/app/state";

export default function HomePage() {
  const [chatEnabled, setChatEnabled] = useState(false);
  const [pairs, setPairs] = useState(false);
  const [timeLimit, setTimeLimit] = useState(600);
  const [username, setUsername] = useState("");
  const createRoom = useMutation(api.rooms.createRoom);
  const router = useRouter();
  const snap = useSnapshot(state);

  const handleClick = async () => {
    try {
      const result = await createRoom({
        username: username,
        chatEnabled: chatEnabled,
        timeLimit: timeLimit,
        pairs: pairs,
      });
      const roomId = result.roomId;
      snap.setPlayerId(result.playerId);
      snap.setUsername(username);
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-[2.9375rem] sm:text-[5.75rem] mt-6 font-extrabold">
        SketchIt
      </h1>
      <form className="flex flex-col gap-6 w-full sm:w-auto max-w-[20rem] sm:max-w-none">
        <Input
          placeholder="Enter the username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Button
          type="submit"
          onClick={(event) => {
            {
              event.preventDefault();
              handleClick().catch((error) => console.log(error));
            }
          }}
        >
          Create Room
        </Button>
        <div className="mt-10 flex justify-between">
          <Switch
            description="Chat"
            onCheckedChange={(checked) => setChatEnabled(checked)}
          />
          <SmallInput
            type="number"
            defaultValue={600}
            description="Time Limit"
            onChange={(event) => setTimeLimit(parseInt(event.target.value))}
          />
          <Switch
            description="Pairplay"
            onCheckedChange={(checked) => setPairs(checked)}
          />
        </div>
      </form>
      <div />
    </main>
  );
}
