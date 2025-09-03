import React, { useRef, useState } from "react";
import Papa from "papaparse";
import useStore from "../store/useStore";

/**
 * This uploader uses PapaParse streaming (step) for large CSVs.
 * For simplicity this version parses and maps CSV headers to the
 * app fields if named similarly. You can expand to a mapping UI.
 */
export default function CSVUploader() {
  const setData = useStore((s) => s.setData);
  const fileRef = useRef();
  const [progress, setProgress] = useState(null);

  function handleFilePicked(e) {
    const file = e.target.files[0];
    if (!file) return;

    const rows = [];
    Papa.parse(file, {
      header: true,
      worker: true,
      skipEmptyLines: true,
      step: (result, parser) => {
        rows.push(result.data);
        if (rows.length % 500 === 0) setProgress(`Parsed ${rows.length} rows...`);
      },
      complete: () => {
        setProgress(null);
        // Basic normalization: if CSV has fields like 'types' as comma separated, convert to array
        const normalized = rows.map((r) => {
          const copy = { ...r };
          if (copy.types && typeof copy.types === "string") {
            copy.types = copy.types.split(/[,;/|]+/).map((s) => s.trim()).filter(Boolean);
          }
          // Basic numeric coercion for common fields:
          ["hp","attack","defense","special-attack","special-defense","speed","id"].forEach(k => {
            if (copy[k] != null && copy[k] !== "" && !isNaN(Number(copy[k]))) copy[k] = Number(copy[k]);
          });
          return copy;
        });
        setData(normalized);
      },
      error: (err) => {
        console.error(err);
        alert("CSV parse error: " + err.message);
      }
    });
  }

  return (
    <div>
      <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFilePicked} />
      <button className="btn btn-secondary" onClick={() => fileRef.current && fileRef.current.click()}>
        Upload CSV
      </button>
      {progress && <span className="ms-2 text-muted">{progress}</span>}
    </div>
  );
}
