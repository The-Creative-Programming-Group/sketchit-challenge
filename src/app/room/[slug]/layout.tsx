import React from "react";
import { Button } from "~/ui/button";

export default function playerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="w-screen h-48 px-10 pt-12">
        <ul className="flex justify-between">
          <li>
            <div className="rounded-3xl w-[99px] h-[80px] bg-primary flex justify-center items-center">
              <div className="rounded-full bg-background w-[46px] h-[46px] flex justify-center items-center">
                <p className="text-primary font-bold text-2xl">F</p>
              </div>
            </div>
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
