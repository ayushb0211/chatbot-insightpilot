import { useState } from "react";
import {
  askQuestion,
  uploadFiles,
} from "../services/api";

export default function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async (
    question,
    webSearch
  ) => {
    if (!question) return;

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    try {
      const res = await askQuestion(
        sessionId,
        question,
        webSearch
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer,
          source: res.data.source,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const upload = async (files) => {
    if (!sessionId) return;

    await uploadFiles(sessionId, files);
  };

  return {
    messages,
    loading,
    send,
    upload,
  };
}