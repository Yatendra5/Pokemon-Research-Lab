import React, { useEffect } from "react";
import useStore from "../store/useStore";
import { fetchPokemonPage } from "../utils/fetchAllPokemon";
import PokemonTable from "./PokemonTable";
import CSVUploader from "./CSVUploader";
import AddColumnButton from "./AddColumnButton";
import ExportButton from "./ExportButton";
import AICommandBox from "./AICommandBox";

export default function MainPanel() {
  const {
    setData,
    page,
    pageSize,
    setTotalCount,
    setPage,
    totalCount,
  } = useStore();

  // Auto-fetch whenever page changes
  useEffect(() => {
    async function load() {
      const offset = (page - 1) * pageSize;
      const data = await fetchPokemonPage(offset, pageSize);
      setData(data);
      // Total count of pokemon available in API (approx 1302)
      setTotalCount(1302);
    }
    load();
  }, [page, pageSize, setData, setTotalCount]);

  return (
    <div>
      {/* Top Controls */}
      <div className="mb-3 d-flex gap-2 align-items-start flex-wrap">
        <CSVUploader />
        <AddColumnButton />
        <ExportButton />
      </div>

      {/* AI Command Box */}
      <AICommandBox />

      {/* Data Table */}
      <div style={{ height: "70vh", border: "1px solid #ddd", padding: 8 }}>
        <PokemonTable />
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="fw-semibold">
          Page {page} of {Math.ceil(totalCount / pageSize) || 1}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={page >= Math.ceil(totalCount / pageSize)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
