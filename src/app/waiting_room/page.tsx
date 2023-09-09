"use client";
import { roomSetting } from "~/app/state";
import { useSnapshot } from "valtio";
import React from "react";
export default function WaitingRoom() {
    const setting = useSnapshot(roomSetting);
    return (
        <main>
            {setting.chat ? <h1>Chat is on</h1> : <h1>Chat is off</h1>}
            {setting.pairplay ? <h1>Pairplay is on</h1> : <h1>Pairplay is off</h1>}
            <h1>{setting.timeLimit}</h1>
        </main>
    )
}