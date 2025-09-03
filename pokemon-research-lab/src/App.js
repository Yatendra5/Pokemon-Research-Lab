import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPanel from "./components/MainPanel";

export default function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container-fluid p-3">
        <h1 className="mb-3">Pokemon Research Lab</h1>
        <MainPanel />
      </div>
    </QueryClientProvider>
  );
}
