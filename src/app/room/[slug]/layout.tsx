import React from 'react';
import Navbar from '../../../ui/navbar';
import Profile from '../../../ui/NavbarContent/profile';

export default function playerLayout({
    children,
                                     }: {
    children: React.ReactNode;
}) {
    return(
        <section className="h-screen px-10 py-14 flex flex-col">
            <Navbar>
                <Profile />
                <Profile />
                <Profile />
            </Navbar>
            {children}
        </section>
    )
}