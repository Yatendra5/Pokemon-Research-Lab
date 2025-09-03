import React from "react";
import useStore from "../store/useStore";
import { exportCSV } from "../utils/exportCSV";

export default function ExportButton() {
  const rows = useStore((s) => s.data);
  return (
    <button className="btn btn-success" onClick={() => { if (rows && rows.length) exportCSV(rows); else alert('No data to export'); }}>
      Export CSV
    </button>
  );
}
