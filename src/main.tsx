import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import MastersPage from "./pages/MastersPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/masters" element={<MastersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
