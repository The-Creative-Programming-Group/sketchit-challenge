export default function RoomPage({ params }: {params: { slug: string }}) {
    return (
        <main>
            <h1>Player Page</h1>
            <h1>{params.slug}</h1>
        </main>
    );
}