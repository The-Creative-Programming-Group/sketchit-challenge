"use client";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Switch } from "~/ui/switch";
import { SmallInput } from "~/ui/small-input";
import { roomSetting } from "~/app/state";
import { useSnapshot } from "valtio";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [timeLimit, setTimeLimit] = useState(600);
  const setting = useSnapshot(roomSetting);
  useEffect(() => {
    console.log(timeLimit);
  }, [timeLimit]);
  return (
    <main className="w-screen flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-[2.9375rem] sm:text-[5.75rem] mt-6 font-extrabold">
        SketchIt
      </h1>
      <form className="flex flex-col gap-6 w-full sm:w-auto max-w-[20rem] sm:max-w-none">
        <Input placeholder="Enter the username" />
        <Link href="/waiting_room">
          <Button className="font-bold" type="submit">
            Create Room
          </Button>
        </Link>
        <div className="mt-10 flex justify-between">
          <Switch
            description="Chat"
            onCheckedChange={(checked) => {
              setting.setChat(checked);
            }}
          />
          <SmallInput
            type="number"
            onChange={(e) => {
              setting.setTimeLimit(parseInt(e.target.value));
            }}
            value={setting.timeLimit}
            defaultValue={setting.timeLimit}
            description="Time limit"
          />
          <Switch
            description="Pairplay"
            onCheckedChange={(checked) => {
              setting.setPairplay(checked);
            }}
          />
        </div>
      </form>
      <div />
    </main>
  );
}
