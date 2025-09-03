import React, { useState } from "react";
import useStore from "../store/useStore";
import parseCommand from "../utils/parseCommand";

export default function AICommandBox() {
  const [cmd, setCmd] = useState("");
  const data = useStore((s) => s.data);
  const setData = useStore((s) => s.setData);
  const bulkUpdate = useStore((s) => s.bulkUpdate);

  function runCommand() {
    const parsed = parseCommand(cmd);
    if (parsed.type === "setFieldByType") {
      const { field, value, ptype } = parsed;
      bulkUpdate((row) => Array.isArray(row.types) && row.types.includes(ptype), (row) => ({ ...row, [field]: isNaN(Number(value)) ? value : Number(value) }));
    } else if (parsed.type === "deleteWhere") {
      const { field, value } = parsed;
      setData(data.filter((r) => String(r[field]) !== value));
    } else if (parsed.type === "updateWhere") {
      const { field, value, whereField, whereValue } = parsed;
      bulkUpdate((r) => String(r[whereField]) === whereValue, (r) => ({ ...r, [field]: value }));
    } else {
      alert("Could not parse command.");
    }
    setCmd("");
  }

  return (
    <div className="mb-2">
      <div className="input-group" style={{ maxWidth: 720 }}>
        <input className="form-control" placeholder="e.g. set hp to 100 for all pokemon of type 'grass'" value={cmd} onChange={(e) => setCmd(e.target.value)} />
        <button className="btn btn-outline-primary" onClick={runCommand}>Run</button>
      </div>
    </div>
  );
}
