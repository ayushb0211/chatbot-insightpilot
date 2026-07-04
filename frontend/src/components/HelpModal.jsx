import { FiX } from "react-icons/fi";

export default function HelpModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-900/95 p-8 shadow-2xl"
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-white/10"
        >
          <FiX size={22} />
        </button>

        {/* Title */}

        {/* <h2 className="mb-2 text-3xl font-bold">Welcome to Dive Inside</h2>

        <p className="mb-8 text-sm text-zinc-400">
          Dive Inside lets you chat with your documents or search the web—all in
          one place.
        </p> */}

        {/* Step 1 */}

        <section className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Step 1: Upload Your Files
          </h3>

          <p className="leading-7 text-zinc-300">
            Click <strong>Upload Files</strong> and add one or more documents to
            begin. Supported file formats include:
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-6 text-zinc-400">
            <li>PDF (.pdf)</li>
            <li>Word (.docx)</li>
            <li>Text (.txt)</li>
            <li>CSV (.csv)</li>
            <li>Excel (.xlsx / .xls)</li>
          </ul>

          <p className="mt-3 leading-7 text-zinc-300">
            You can upload multiple files in the same session to get richer and
            more accurate responses.
          </p>
        </section>

        {/* Step 2 */}

        <section className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Step 2: Ask Questions
          </h3>

          <p className="leading-7 text-zinc-300">
            Once your documents are uploaded, type your question in the chat box
            and let Dive Inside find the relevant information.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-zinc-400">Try asking:</p>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
              <li>Summarize this document.</li>
              <li>What are the key findings?</li>
              <li>Show the total sales.</li>
              <li>Compare this year's performance with last year.</li>
              <li>Find details about employee John.</li>
            </ul>
          </div>
        </section>

        {/* Step 3 */}

        <section className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Step 3: Enable Web Search (Optional)
          </h3>

          <p className="leading-7 text-zinc-300">
            Turn on <strong>Web Search</strong> whenever you want information
            beyond your uploaded documents.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-zinc-400">Examples:</p>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
              <li>Latest AI news</li>
              <li>Current stock prices</li>
              <li>Weather updates</li>
              <li>Recent company announcements</li>
            </ul>
          </div>

          <p className="mt-3 leading-7 text-zinc-300">
            If Web Search is disabled, answers are generated only from your
            uploaded documents.
          </p>
        </section>

        {/* Managing Files */}

        <section className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">📁 Managing Your Files</h3>

          <ul className="list-disc space-y-2 pl-6 text-zinc-400">
            <li>Upload additional files anytime during the session.</li>
            <li>
              Remove uploaded files from the sidebar when they are no longer
              needed.
            </li>
            <li>
              Use multiple related documents together for better responses.
            </li>
          </ul>
        </section>

        {/* Tips */}

        <section className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Tips for Better Results
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-zinc-400">
            <li>Ask clear and specific questions.</li>
            <li>Upload readable, well-formatted documents.</li>
            <li>
              For spreadsheets, mentioning column names can improve results.
            </li>
            <li>Upload related files together for better context.</li>
          </ul>
        </section>

        {/* Notes */}

        <section>
          <h3 className="mb-3 text-xl font-semibold">⚠ Before You Start</h3>

          <ul className="list-disc space-y-2 pl-6 text-zinc-400">
            <li>Upload documents before asking document-related questions.</li>
            <li>
              Enable Web Search only when information is needed beyond your
              files.
            </li>
            <li>Sessions automatically expire after a period of inactivity.</li>
            <li>
              Always verify important information before making decisions.
            </li>
          </ul>

          <p className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4 text-center text-sm text-violet-200">
            You're all set! Upload your first document and start chatting.
          </p>
        </section>
      </div>
    </div>
  );
}
