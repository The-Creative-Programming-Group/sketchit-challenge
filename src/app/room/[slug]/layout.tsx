"use client";
import React from 'react';
import Navbar from '../../../ui/navbar';
import Profile from '../../../ui/Profile';
import {useSnapshot} from "valtio";
import {state} from "~/app/state";

export default function playerLayout({
    children,
                                     }: {
    children: React.ReactNode;
}) {
    const snap = useSnapshot(state);
    return(
        <section className="h-screen px-10 py-14 flex flex-col">
            <Navbar>
                <Profile type="nav" initial={snap.user.charAt(0).toUpperCase()}/>
                <Profile type="nav" initial={snap.user.charAt(0).toUpperCase()}/>
                <Profile type="nav" initial={snap.user.charAt(0).toUpperCase()}/>
            </Navbar>
            {children}
        </section>
    )
}