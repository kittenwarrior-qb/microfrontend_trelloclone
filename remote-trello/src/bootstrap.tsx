import { createRoot } from "react-dom/client";
import TrelloPage from "./pages/TrelloPage";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

createRoot(container).render(<TrelloPage />);
