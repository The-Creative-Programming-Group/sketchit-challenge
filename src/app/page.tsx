import {Button} from "~/ui/button";
import {Input} from "~/ui/input";

export default function HomePage() {
  return (
    <main className="w-screen flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-[2.9375rem] sm:text-[5.75rem] font-extrabold">SketchIt</h1>
      <form className="flex flex-col gap-6 w-full sm:w-auto max-w-[20rem] sm:max-w-none">
        <Input placeholder="Enter the username" />
        <Button type="submit">Create Room</Button>
      </form>
        <div />
    </main>
  );
}
