import React, { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import useStore from "../store/useStore";

export default function PokemonTable() {
  const data = useStore((s) => s.data);
  const columnsMeta = useStore((s) => s.columnsMeta);

  const containerRef = useRef(null);

  const columns = useMemo(() => {
    const base = [
      { id: "id", header: "ID", align: "left" },
      { id: "sprite", header: "Sprite", align: "center" },
      { id: "name", header: "Name", align: "left" },
      { id: "types", header: "Type(s)", align: "left" },
      { id: "hp", header: "HP", align: "center" },
      { id: "attack", header: "Attack", align: "center" },
      { id: "defense", header: "Defense", align: "center" },
      { id: "special-attack", header: "Sp. Atk", align: "center" },
      { id: "special-defense", header: "Sp. Def", align: "center" },
      { id: "speed", header: "Speed", align: "center" },
    ];
    const dynamic = (columnsMeta || []).map((c) => ({
      id: c.id,
      header: c.header,
      align: "left",
    }));
    return [...base, ...dynamic];
  }, [columnsMeta]);

  // Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 56,
    overscan: 8,
  });

  if (!data || data.length === 0) {
    return <div className="p-3">No data loaded yet.</div>;
  }

  return (
    <div ref={containerRef} style={{ height: "100%", overflow: "auto" }}>
      <table
        className="table table-sm mb-0"
        style={{
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        <thead
          className="table-light"
          style={{ position: "sticky", top: 0, zIndex: 2 }}
        >
          <tr>
            {columns.map((c) => (
              <th
                key={c.id}
                style={{ minWidth: 120, textAlign: c.align }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const i = virtualRow.index;
            const row = data[i];
            return (
              <tr key={i} style={{ height: virtualRow.size }}>
                {columns.map((col) => (
                  <td
                    key={col.id}
                    style={{ minWidth: 120, textAlign: col.align }}
                  >
                    {col.id === "sprite" ? (
                      row?.sprite ? (
                        <img src={row.sprite} alt="" style={{ width: 40 }} />
                      ) : null
                    ) : col.id === "types" ? (
                      <div>
                        {Array.isArray(row?.types)
                          ? row.types.join(" / ")
                          : row?.types ?? ""}
                      </div>
                    ) : (
                      <span>{row?.[col.id]}</span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
