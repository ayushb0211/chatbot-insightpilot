import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Chat from "./pages/Chat";

import SilkBackground from "./components/SilkBackground";

function App() {
  return (
    <>

      <Toaster position="bottom-right" />

      {/* Animated Background */}
      <SilkBackground />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-[1]" />

      {/* Application */}
      <div className="relative z-10 h-screen w-screen overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;