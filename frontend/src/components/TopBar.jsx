import { FiPlus } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";

export default function TopBar({
  projectName = "No Project",
  onNewChat,
}) {
  return (
    <header className="fixed left-[280px] top-0 z-30 flex h-20 w-[calc(100%-280px)] items-center justify-between px-8 backdrop-blur-md">

      <div className="text-sm font-medium text-zinc-400">
        Current Project:
        <span className="ml-2 text-white">
          {projectName}
        </span>
      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
        >
          <FiPlus size={16} />
          <span>New Chat</span>
        </button>

        <button className="rounded-full p-2 transition hover:bg-white/5">
          <MdDarkMode
            size={20}
            className="text-violet-300"
          />
        </button>

      </div>

    </header>
  );
}