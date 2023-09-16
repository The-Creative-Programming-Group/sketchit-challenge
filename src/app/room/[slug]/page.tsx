import Chat from "~/ui/chat";

export default function RoomPage({ params }: {params: { slug: string }}) {
    return (
        <main className="h-full flex justify-between">
            <Chat roomId={params.slug}/>
        </main>
    );
}