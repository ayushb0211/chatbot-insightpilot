import {
  FiFileText,
  FiFile,
  FiUpload,
  FiSettings,
  FiHelpCircle,
  FiTrash2,
} from "react-icons/fi";

const iconMap = {
  pdf: <FiFileText className="text-red-400 text-lg" />,
  docx: <FiFileText className="text-blue-400 text-lg" />,
  xlsx: <FiFile className="text-green-400 text-lg" />,
  xls: <FiFile className="text-green-400 text-lg" />,
  csv: <FiFile className="text-emerald-400 text-lg" />,
  txt: <FiFileText className="text-zinc-400 text-lg" />,
};

export default function Sidebar({
  open,
  setOpen,
  files = [],
  onUpload,
  onDelete,
}) {
  return (
    // <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-white/10 bg-surface-container-low/80 p-4 backdrop-blur-3xl">
    <aside
      className={`
    fixed left-0 top-0 z-50 flex h-screen flex-col
    border-r border-white/10
    bg-surface-container-low/80
    px-4 pt-4 pb-6 backdrop-blur-3xl
    transition-transform duration-300

    ${
      open
        ? "translate-x-0 w-[280px]"
        : "-translate-x-full md:translate-x-0 md:w-[80px]"
    }
  `}
    >
      <button
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4 text-2xl md:hidden"
      >
        ✕
      </button>
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">

          <span
            className="material-symbols-outlined text-on-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>

        </div> */}
        {open && (
          <div>
            <h1 className="text-2xl font-bold text-primary">Insight Pilot</h1>

            {/* <p className="text-[10px] uppercase tracking-[0.2em] text-outline">
              AI Workspace
            </p> */}
          </div>
        )}
      </div>

      {/* Files */}
      <div className="flex-1 overflow-y-auto">
        {/* <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wider text-outline-variant">
          Files
        </p> */}
        {open && (
          <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wider text-outline-variant">
            Files
          </p>
        )}

        <div className="space-y-1">
          {files.length === 0 && open && (
            <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-sm text-zinc-500">
              No files uploaded
            </div>
          )}

          {files.map((file) => (
            <div
              key={file.name}
              // className="group flex items-center justify-between rounded-lg p-2 transition hover:bg-white/5"
              className={`group flex rounded-lg p-2 transition hover:bg-white/5 ${
                open ? "items-center justify-between" : "justify-center"
              }`}
            >
              <div
                // className="flex items-center gap-3 overflow-hidden"
                className={`flex items-center overflow-hidden ${
                  open ? "gap-3" : ""
                }`}
              >
                {iconMap[file.type] ?? <FiFile className="text-zinc-400" />}

                {/* <span className="truncate text-sm">{file.name}</span> */}
                {open && <span className="truncate text-sm">{file.name}</span>}
              </div>

              <button
                onClick={() => onDelete(file)}
                className="opacity-0 transition group-hover:opacity-100"
              >
                <FiTrash2 className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}

      <div className="pt-4">
        {/* <button className="mb-2 flex w-full items-center gap-3 rounded-lg p-2 text-zinc-300 hover:bg-white/5">

          <FiSettings />

          <span>Settings</span>

        </button>

        <button className="mb-4 flex w-full items-center gap-3 rounded-lg p-2 text-zinc-300 hover:bg-white/5">

          <FiHelpCircle />

          <span>Help</span>

        </button> */}

        <button
          onClick={onUpload}
          // className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-on-primary transition hover:scale-[0.98]"
          className={`bg-primary font-semibold text-on-primary transition hover:scale-[0.98]
          ${
            open
              ? "flex w-full items-center justify-center gap-2 rounded-xl py-3"
              : "mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full"
          }`}
        >
          <FiUpload />
          {/* Upload Files */}
          {open && "Upload Files"}
        </button>
        {open && (
          <>
            {/* <p className="mb-4 text-center text-[11px] text-zinc-500">
              Supports PDF • DOCX • TXT • CSV • XLSX
            </p> */}
            <p
              className={`mt-4 text-center text-[11px] text-zinc-500 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Supports PDF • DOCX • TXT • CSV • XLSX
            </p>

            {/* <p className="text-center text-[11px] leading-5 text-zinc-600">
              Enable Web Search to explore information beyond your uploaded
              documents.
            </p> */}
          </>
        )}
      </div>
    </aside>
  );
}
