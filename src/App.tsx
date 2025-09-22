import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConversionPage from "./pages/ConversionPage";
import CompressPage from "./pages/CompressPage";
import MergePage from "./pages/MergePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compress" element={<CompressPage />} />
          <Route path="/merge" element={<MergePage />} />
          <Route path="/:type" element={<ConversionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
