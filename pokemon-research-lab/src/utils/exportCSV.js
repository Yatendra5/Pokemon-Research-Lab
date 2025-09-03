import { saveAs } from "file-saver";

export function exportCSV(rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0] || {});
  const lines = [headers.join(",")];

  for (const r of rows) {
    const line = headers
      .map((h) => {
        const v = r[h];
        if (v == null) return "";
        if (Array.isArray(v)) return `"${v.join(" / ")}"`;
        return `"${String(v).replace(/"/g, '""')}"`;
      })
      .join(",");
    lines.push(line);
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "pokemon_export.csv");
}
