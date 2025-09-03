import React from "react";
import useStore from "../store/useStore";

export default function AddColumnButton() {
  const addColumn = useStore((s) => s.addColumn);

  function handleClick() {
    const name = prompt("Enter new column name:");
    if (!name) return;
    const type = prompt("Type? (text/number/boolean)", "text");
    let defaultValue = "";
    if (type === "number") defaultValue = 0;
    if (type === "boolean") defaultValue = false;
    const id = name.toLowerCase().replace(/\s+/g, "_");
    addColumn({ id, header: name, type, defaultValue });
  }

  return <button className="btn btn-outline-primary" onClick={handleClick}>Add Column</button>;
}
