import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";

/**
 * Generic editable cell. Saves on blur or when Save clicked.
 * Props:
 *  - rowIndex: index of row in store array
 *  - columnKey: key in row object
 *  - value: initial display value
 */
export default function CellRenderer({ rowIndex, columnKey, value }) {
  const updateRow = useStore((s) => s.updateRow);
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value ?? "");

  useEffect(() => setVal(value ?? ""), [value]);

  function save() {
    // Try to coerce numbers if original looks numeric
    const parsed = (typeof value === "number") ? (Number(val) || 0) : val;
    updateRow(rowIndex, { [columnKey]: parsed });
    setEditing(false);
  }

  return (
    <div>
      {editing ? (
        <div className="d-flex gap-2">
          <input className="form-control form-control-sm" value={val} onChange={(e) => setVal(e.target.value)} />
          <button className="btn btn-sm btn-primary" onClick={save}>Save</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => { setVal(value ?? ""); setEditing(false); }}>Cancel</button>
        </div>
      ) : (
        <div onDoubleClick={() => setEditing(true)} style={{ cursor: "pointer", minHeight: 20 }}>
          {String(value ?? "")}
        </div>
      )}
    </div>
  );
}
