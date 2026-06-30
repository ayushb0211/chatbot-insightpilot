import { useState } from "react";
import {
  createSession,
  deleteSession,
} from "../services/api";

export default function useSession() {
  const [sessionId, setSessionId] = useState("");

  const create = async () => {
    const res = await createSession();

    setSessionId(res.data.session_id);

    return res.data.session_id;
  };

  const remove = async () => {
    if (!sessionId) return;

    await deleteSession(sessionId);

    setSessionId("");
  };

  return {
    sessionId,
    create,
    remove,
  };
}