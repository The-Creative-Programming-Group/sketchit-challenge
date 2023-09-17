"use client";
import React from "react";
import Profile from "../../../ui/profile";
import { useSnapshot } from "valtio";
import { state } from "~/app/state";
import { Button } from "~/ui/button";

export default function playerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snap = useSnapshot(state);
  return (
    <section className="h-screen px-10 py-14 flex flex-col">
      <nav className="w-auto h-20 px-3 mb-7">
        <ul className="flex justify-between">
          <li>
            <Profile type="nav" initial={snap.user.charAt(0).toUpperCase()} />
          </li>
          <li>
            <Button className="sm:text-2xl rounded-xl">Start Game</Button>
          </li>
          <li>
            <Button className="sm:text-2xl rounded-xl">Invite</Button>
          </li>
        </ul>
      </nav>
      {children}
    </section>
  );
}
