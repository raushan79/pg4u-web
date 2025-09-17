import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PGDetails from "./pages/PGDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pg/:id" element={<PGDetails />} />

            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer - Always at Bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
