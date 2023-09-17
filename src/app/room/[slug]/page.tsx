import Chat from "~/ui/chat";
import { type Id } from "../../../../convex/_generated/dataModel";

export default function RoomPage({ params }: { params: { slug: string } }) {
  const roomId = params.slug as Id<"rooms">;
  return (
    <main className="h-full flex justify-between min-h-0 gap-12">
      <div className="h-full w-full"></div>
      <Chat roomId={roomId} />
    </main>
  );
}
