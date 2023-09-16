"use client";
import React from 'react';
import {useMutation, useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import {state} from "~/app/state";
import {useSnapshot} from "valtio";

const Chat = ({roomId}) => {
    const snap = useSnapshot(state);
    const get_message = useQuery(api.messages.list, {roomId});
    const send_message = useMutation(api.messages.send);
    console.log(get_message);
    return (
        <div>
            <h1>Chat</h1>
            <button onClick ={() => {send_message({body: "Hello", roomId: roomId, playerId: snap.playerId})}}>
               Send Message
            </button>

        </div>
    )
};

export default Chat;