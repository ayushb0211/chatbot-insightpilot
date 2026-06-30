import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export async function createSession() {
  const { data } = await API.post("/session");
  return data;
}

export async function uploadFiles(sessionId, files) {
  const formData = new FormData();

  formData.append("session_id", sessionId);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await API.post(
    "/ingest",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function askQuestion({
  session_id,
  question,
  web_search,
}) {
  const { data } = await API.post("/chat", {
    session_id,
    question,
    web_search,
  });

  return data;
}

export async function deleteSession(sessionId) {
  const { data } = await API.delete(
    `/session/${sessionId}`
  );

  return data;
}

export default API;