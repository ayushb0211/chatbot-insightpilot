import { useEffect, useRef, useState } from "react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import toast from "react-hot-toast";

import {
  createSession,
  uploadFiles,
  askQuestion,
  deleteSession,
} from "../services/api";
import HelpModal from "../components/HelpModal";

export default function Chat() {
  const [sessionId, setSessionId] = useState(null);

  const [messages, setMessages] = useState([]);

  const [files, setFiles] = useState([]);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [webSearch, setWebSearch] = useState(false);

  // const [sidebarOpen, setSidebarOpen] = useState(
  // window.innerWidth >= 768);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [helpOpen, setHelpOpen] = useState(false);

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
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function initializeSession() {
    try {
      const response = await createSession();

      setSessionId(response.session_id);
    } catch (err) {
      console.error(err);
      toast.error("Server down!");
    }
  }

  async function handleUpload(event) {
    console.log("button clicked");
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length === 0) {
      toast.caller("Upload at least single file.");
      return;
    }

    if (!sessionId) {
      toast.error("Start new chat");
    }

    setLoading(true);
    try {
      // await uploadFiles(sessionId, selectedFiles);
      await toast.promise(uploadFiles(sessionId, selectedFiles), {
        loading: "Uploading files...",
        success: "Files uploaded successfully!",
        error: "Upload failed!",
      });

      const uploaded = selectedFiles.map((file) => ({
        name: file.name,
        type: file.name.split(".").pop(),
      }));

      setFiles((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed !");
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!question.trim() || !sessionId) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {
      const response = await askQuestion({
        session_id: sessionId,
        question: currentQuestion,
        web_search: webSearch,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          source: response.source || "Vector Store",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while generating the response.",
          source: "System",
        },
      ]);

      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // function handleNewChat() {
  //   setMessages([]);
  // }

  async function handleNewChat() {
    try {
      if (sessionId) {
        await deleteSession(sessionId);
      }

      const response = await createSession();

      setSessionId(response.session_id);

      setMessages([]);
      setFiles([]);
      setQuestion("");
      setWebSearch(false);
      
      toast.success("New chat created!")
    } catch (err) {
      console.error(err);
      toast.error("Server down!")
    }
  }

  function handleDelete(file) {
    setFiles((prev) => prev.filter((f) => f.name !== file.name));
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        files={files}
        onUpload={() => document.querySelector('input[type="file"]')?.click()}
        onDelete={handleDelete}
      />

      {/* <main className="ml-[280px] flex flex-1 flex-col"> */}
      <main
        className={`flex flex-1 flex-col transition-all duration-300
          ${sidebarOpen ? "md:ml-[280px]" : "md:ml-[80px]"}
          ml-0`}
      >
        <TopBar
          projectName="InsightPilot"
          onNewChat={handleNewChat}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onHelp={() => setHelpOpen(true)}
        />

        <div ref={chatRef} className="flex-1 overflow-y-auto">
          <ChatWindow messages={messages} loading={loading} />
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
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
