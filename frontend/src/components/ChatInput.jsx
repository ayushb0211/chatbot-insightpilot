import { useRef, useState } from "react";
import {
  FiPlus,
  FiSend,
  FiUpload,
  FiGlobe,
} from "react-icons/fi";

export default function ChatInput({
  value,
  onChange,
  onSend,
  onUpload,
  webSearch,
  setWebSearch,
  disabled = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const fileRef = useRef(null);

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      if (!disabled && value.trim()) {
        onSend();
      }
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        hidden
        multiple
        onChange={(e) => onUpload(e)}
      />

      <div className="w-full px-6 pb-6">

        <div className="mx-auto max-w-4xl">

          <div className="relative flex items-end gap-2 rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-3xl">

            {/* + Button */}

            <div className="relative">

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="rounded-2xl p-3 transition hover:bg-white/10"
              >
                <FiPlus size={22} />
              </button>

              {menuOpen && (
                <div className="absolute bottom-16 left-0 z-50 w-60 rounded-2xl border border-white/10 bg-zinc-900/90 p-2 shadow-2xl backdrop-blur-3xl">

                  <button
                    onClick={() => {
                      fileRef.current.click();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5"
                  >
                    <FiUpload />

                    Upload Files
                  </button>

                  <div className="mt-2 flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/5">

                    <div className="flex items-center gap-3">

                      <FiGlobe />

                      Web Search

                    </div>

                    <button
                      onClick={() =>
                        setWebSearch(
                          !webSearch
                        )
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        webSearch
                          ? "bg-violet-500"
                          : "bg-zinc-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          webSearch
                            ? "right-1"
                            : "left-1"
                        }`}
                      />
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* Textarea */}

            <textarea
              rows={1}
              value={value}
              onChange={(e) =>
                onChange(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask Dive Inside anything..."
              className="max-h-40 flex-1 resize-none bg-transparent px-2 py-3 text-white outline-none placeholder:text-zinc-500"
            />

            {/* Send */}

            <button
              disabled={
                disabled ||
                !value.trim()
              }
              onClick={onSend}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSend size={18} />
            </button>

          </div>

          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Dive Inside can make mistakes. Verify important information.
          </p>

        </div>

      </div>
    </>
  );
}