import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import these
import HomePage from "./pages/HomePage";
import ConversionPage from "./pages/ConversionPage";
import CompressPage from "./pages/CompressionPage";
import MergePage from "./pages/MergingPage";
import NotFound from "./pages/NotFound";

// Create QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
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
