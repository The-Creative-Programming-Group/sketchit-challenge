import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Switch } from "~/ui/switch";
import { SmallInput } from "~/ui/small-input";

export default function HomePage() {
  return (
    <main className="w-screen flex min-h-fullDVH flex-col items-center justify-between">
      <h1 className="text-[2.9375rem] sm:text-[5.75rem] mt-6 font-extrabold">
        SketchIt
      </h1>
      <form className="flex flex-col gap-6 w-full sm:w-auto max-w-[20rem] sm:max-w-none">
        <Input placeholder="Enter the username" />
        <Button className="font-bold" type="submit">
          Create Room
        </Button>
        <div className="mt-10 flex justify-between">
          <Switch description="Chat" />
          <SmallInput
            type="number"
            defaultValue={600}
            description="Time limit"
          />
          <Switch description="Pairplay" />
        </div>
      </form>
      <div />
    </main>
  );
}
