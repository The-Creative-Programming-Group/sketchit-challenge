const Profile = ({
  type,
  initial,
}: {
  type: "nav" | "chat";
  initial: string;
}) => {
  return (
    <div>
      {type === "nav" && (
        <div className="flex flex-col items-center justify-center w-[99px] h-[79px] bg-primary rounded-3xl">
          <div className="w-[46px] h-[46px] bg-background rounded-full flex justify-center items-center">
            <p className="text-primary font-extrabold text-2xl">{initial}</p>
          </div>
        </div>
      )}
      {type === "chat" && (
        <div className="w-[37px] h-[37px] bg-background rounded-full flex justify-center items-center">
          <p className="text-primary font-extrabold text-2xl">{initial}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
