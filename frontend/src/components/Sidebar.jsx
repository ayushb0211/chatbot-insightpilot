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
  files = [],
  onUpload,
  onDelete,
}) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-white/10 bg-surface-container-low/80 p-4 backdrop-blur-3xl">

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

        <div>

          <h1 className="text-2xl font-bold text-primary">
            Dive Inside
          </h1>

          <p className="text-[10px] uppercase tracking-[0.2em] text-outline">
            AI Workspace
          </p>

        </div>

      </div>

      {/* Files */}

      <div className="flex-1 overflow-y-auto">

        <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wider text-outline-variant">
          Files
        </p>

        <div className="space-y-1">

          {files.length === 0 && (
            <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-sm text-zinc-500">
              No files uploaded
            </div>
          )}

          {files.map((file) => (
            <div
              key={file.name}
              className="group flex items-center justify-between rounded-lg p-2 transition hover:bg-white/5"
            >

              <div className="flex items-center gap-3 overflow-hidden">

                {iconMap[file.type] ?? (
                  <FiFile className="text-zinc-400" />
                )}

                <span className="truncate text-sm">
                  {file.name}
                </span>

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

      <div className="mt-4 border-t border-white/10 pt-4">

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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-on-primary transition hover:scale-[0.98]"
        >

          <FiUpload />

          Upload Files

        </button>

      </div>

    </aside>
  );
}