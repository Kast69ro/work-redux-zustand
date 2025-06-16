import { Routes, Route } from "react-router-dom";
import Layout from "./providers/layout/layout";
import Home from "./pages/home";
import FirstPage from "./pages/first-page";
import SecondPage from "./pages/second-page";
import ThridPage from "./pages/thrid-page";
import FourthPage from "./pages/fourth-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="redux-sync" element={<FirstPage />} />
        <Route path="redux-async" element={<SecondPage />} />
        <Route path="zustand-sync" element={<ThridPage />} />
        <Route path="zustand-async" element={<FourthPage />} />
      </Route>
    </Routes>
  );
}
