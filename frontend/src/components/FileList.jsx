import {
  FiFileText,
  FiFile,
  FiTrash2,
} from "react-icons/fi";

export default function FileList({
  files,
  onDelete,
}) {
  return (
    <div className="file-list">

      {files.map((file, index) => (
        <div className="file-item" key={index}>

          <div className="left">

            {file.type === "pdf" && (
              <FiFileText color="#ff5f56" />
            )}

            {file.type === "excel" && (
              <FiFile color="#32c766" />
            )}

            {file.type === "txt" && (
              <FiFile color="#999" />
            )}

            <span>{file.name}</span>

          </div>

          <button onClick={() => onDelete(index)}>
            <FiTrash2 />
          </button>

        </div>
      ))}

    </div>
  );
}