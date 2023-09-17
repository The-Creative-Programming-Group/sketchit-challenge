import Chat from "~/ui/chat";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full flex justify-between min-h-0 gap-12">
      <div className="h-full w-full"></div>
      <Chat roomId={params.slug} />
    </main>
  );
}
