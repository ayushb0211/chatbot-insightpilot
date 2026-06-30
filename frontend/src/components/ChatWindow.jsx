import Message from "./Message";

export default function ChatWindow({
  messages = [],
  loading = false,
}) {
  return (
    <div
      id="chat-canvas"
      className="flex-1 overflow-y-auto px-6 py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4">

        {messages.length === 0 && !loading && (
          <div className="mt-28 flex flex-col items-center justify-center text-center">

            {/* <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 backdrop-blur-2xl">

              <span
                className="material-symbols-outlined text-5xl text-primary"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                auto_awesome
              </span>

            </div> */}

            <h1 className="mb-4 text-5xl font-bold">
              Dive Inside
            </h1>

            <p className="max-w-xl text-lg text-zinc-400">
              Upload documents and ask questions.
              Responses are generated using
              Vector Search, SQL Retrieval and
              optional Web Search.
            </p>

          </div>
        )}

        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
            source={message.source}
          />
        ))}

        {loading && (
          <div className="flex justify-start">

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-2xl">

              <div className="mb-3 flex items-center gap-2">

                {/* <span
                  className="material-symbols-outlined text-primary"
                  style={{
                    fontVariationSettings:
                      "'FILL' 1",
                  }}
                >
                  auto_awesome
                </span> */}

                <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">

                  Thinking

                </span>

              </div>

              <div className="flex gap-2">

                <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-primary"
                  style={{
                    animationDelay: "0.15s",
                  }}
                ></span>

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-primary"
                  style={{
                    animationDelay: "0.3s",
                  }}
                ></span>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}