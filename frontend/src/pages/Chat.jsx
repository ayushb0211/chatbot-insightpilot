import { useEffect, useRef, useState } from "react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import {
  createSession,
  uploadFiles,
  askQuestion,
  deleteSession,
} from "../services/api";

export default function Chat() {
  const [sessionId, setSessionId] = useState(null);

  const [messages, setMessages] = useState([]);

  const [files, setFiles] = useState([]);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [webSearch, setWebSearch] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    initializeSession();

    return () => {
      if (sessionId) {
        deleteSession(sessionId);
      }
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function initializeSession() {
    try {
      const response = await createSession();

      setSessionId(response.session_id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpload(event) {
    const selectedFiles = Array.from(
      event.target.files
    );

    if (
      selectedFiles.length === 0 ||
      !sessionId
    )
      return;

    try {
      setLoading(true);

      await uploadFiles(
        sessionId,
        selectedFiles
      );

      const uploaded = selectedFiles.map(
        (file) => ({
          name: file.name,
          type:
            file.name.split(".").pop(),
        })
      );

      setFiles((prev) => [
        ...prev,
        ...uploaded,
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (
      !question.trim() ||
      !sessionId
    )
      return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {
      const response =
        await askQuestion({
          session_id: sessionId,
          question: currentQuestion,
          web_search: webSearch,
        });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.answer,
          source:
            response.source ||
            "Vector Store",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while generating the response.",
          source: "System",
        },
      ]);

      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
  }

  function handleDelete(file) {
    setFiles((prev) =>
      prev.filter(
        (f) => f.name !== file.name
      )
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden">

      <Sidebar
        files={files}
        onUpload={() =>
          document
            .querySelector(
              'input[type="file"]'
            )
            ?.click()
        }
        onDelete={handleDelete}
      />

      <main className="ml-[280px] flex flex-1 flex-col">

        {/* <TopBar
          projectName="InsightPilot"
          onNewChat={handleNewChat}
        /> */}

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto"
        >
          <ChatWindow
            messages={messages}
            loading={loading}
          />
        </div>
                <ChatInput
          value={question}
          onChange={setQuestion}
          onSend={handleSend}
          onUpload={handleUpload}
          webSearch={webSearch}
          setWebSearch={setWebSearch}
          disabled={loading}
        />

      </main>

    </div>
  );
}