import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import ConversionPage from "./pages/ConversionPage";
import CompressionPage from "./pages/CompressionPage";
import MergingPage from "./pages/MergingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compress" element={<CompressionPage />} />
        <Route path="/merge" element={<MergingPage />} />
        <Route path="/:type" element={<ConversionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
