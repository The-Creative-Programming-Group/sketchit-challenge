"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { state } from "~/app/state";
import { useSnapshot } from "valtio";
import Profile from "./profile";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { useRef } from "react";
import { Id } from "../../convex/_generated/dataModel";

const Chat = ({ roomId }: { roomId: Id<"rooms"> }) => {
  const [message, setMessage] = useState("");
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const snap = useSnapshot(state);
  const get_message = useQuery(api.messages.list, { roomId });
  const send_message = useMutation(api.messages.send);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    if (scrollBottom < 100 && !scrollToBottom) {
      setScrollToBottom(true);
    } else if (scrollBottom > 100 && scrollToBottom) {
      setScrollToBottom(false);
    }
  };

  useEffect(() => {
    if (scrollToBottom) {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [get_message]);

  return (
    <div className="flex flex-col bg-primary w-[330px] h-full p-6 rounded-3xl justify-between">
      <div
        className="overflow-y-scroll rounded-3xl"
        ref={chatRef}
        onScroll={handleScroll}
      >
        {get_message?.map(({ _id, body, username }) => (
          <div key={_id} className="flex gap-2 mb-2 items-center">
            {username ? (
              <Profile type="chat" initial={username.charAt(0).toUpperCase()} />
            ) : (
              <Profile type="chat" initial="A" />
            )}
            <div className="bg-background w-full h-[37px] rounded-full pl-2 flex items-center">
              <p className="text-primary">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 justify-center">
        <input
          className="pl-3 h-[37px] w-full rounded-full placeholder:text-accent placeholder:text-xs"
          value={message}
          type="text"
          placeholder="Type a message"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            {
              if (event.key === "Enter") {
                if (message !== "") {
                  send_message({
                    body: message,
                    playerId: snap.playerId,
                    roomId: roomId,
                  }).catch(error);
                  setMessage("");
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
