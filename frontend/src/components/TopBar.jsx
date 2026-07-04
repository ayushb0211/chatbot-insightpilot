import { FiHelpCircle, FiMenu, FiPlus } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";

export default function TopBar({
  projectName = "No Project",
  onNewChat,
  sidebarOpen,
  setSidebarOpen,
  onHelp,
}) {
  return (
    // <header className="fixed left-[280px] top-0 z-30 flex h-20 w-[calc(100%-280px)] items-center justify-between px-8 backdrop-blur-md">
    <header
      className={`
    fixed top-0 right-0 z-30
    flex h-20 items-center justify-between
    px-6 backdrop-blur-md transition-all duration-300

    ${
      sidebarOpen
        ? "md:left-[280px] md:w-[calc(100%-280px)]"
        : "md:left-[80px] md:w-[calc(100%-80px)]"
    }

    left-0 w-full
  `}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          <FiMenu size={22} />
        </button>
        {/* <div className="text-sm font-medium text-zinc-400"> */}
        <div className="ml-2 text-white">
          Current Chat
          {/* <span className="ml-2 text-white">{projectName}</span> */}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
        >
          <FiPlus size={16} />
          <span>New Chat</span>
        </button>

        {/* <button className="rounded-full p-2 transition hover:bg-white/5">
          <MdDarkMode size={20} className="text-violet-300" />
        </button> */}
        <button
          onClick={onHelp}
          className="rounded-full p-2 transition hover:bg-white/5"
        >
          <FiHelpCircle size={20} className="text-violet-300" />
        </button>
      </div>
    </header>
  );
}
