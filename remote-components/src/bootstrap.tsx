import { createRoot } from "react-dom/client";
import MyCard from "./components/Card";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

createRoot(container).render(<MyCard />);
