import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Message({
  role,
  content,
  source,
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`max-w-[90%] rounded-2xl px-5 py-4 shadow-xl ${
          isUser
            ? "rounded-tr-none bg-violet-500/20 border border-violet-500/30 backdrop-blur-2xl"
            : "rounded-tl-none border border-white/10 bg-white/5 backdrop-blur-2xl"
        }`}
      >
        {!isUser && source && (
          <div className="mb-4 flex items-center gap-2">

            {/* <span
              className="material-symbols-outlined text-primary"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              auto_awesome
            </span> */}

            <span className="rounded border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              {source}
            </span>

          </div>
        )}

        <ReactMarkdown
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }) {
              const match = /language-(\w+)/.exec(
                className || ""
              );

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius: 12,
                    marginTop: 16,
                    marginBottom: 16,
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="rounded bg-white/10 px-1 py-0.5"
                  {...props}
                >
                  {children}
                </code>
              );
            },

            table({ children }) {
              return (
                <div className="my-4 overflow-auto rounded-xl border border-white/10">
                  <table className="w-full">
                    {children}
                  </table>
                </div>
              );
            },

            th({ children }) {
              return (
                <th className="border-b border-white/10 bg-white/5 px-4 py-2 text-left">
                  {children}
                </th>
              );
            },

            td({ children }) {
              return (
                <td className="border-b border-white/5 px-4 py-2">
                  {children}
                </td>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}