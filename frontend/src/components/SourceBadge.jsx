export default function SourceBadge({ source }) {
  const colors = {
    VectorStore: "#7C5CFC",
    SQLite: "#10b981",
    Tavily: "#3b82f6",
  };

  return (
    <span
      className="source-badge"
      style={{
        background: colors[source] || "#666",
      }}
    >
      {source}
    </span>
  );
}