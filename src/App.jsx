import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/pg-listing"
              element={
                <ComingSoon
                  title="PG Owner Portal in Progress"
                  description="We're building a streamlined flow for owners to list their properties. Stay tuned!"
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <ComingSoon
                  title="Insights & Guides Coming Soon"
                  description="Our content team is curating city guides and moving tips. Check back shortly!"
                />
              }
            />
            <Route
              path="/contact-us"
              element={
                <ComingSoon
                  title="Support Page Under Construction"
                  description="Need help? Drop us a line at support@pg4u.com while we finish this page."
                />
              }
            />
            <Route
              path="*"
              element={
                <ComingSoon
                  title="Page Not Found"
                  description="The page you're looking for is being built. Head back home while we craft it."
                />
              }
            />
          </Routes>
        </main>

        {/* Footer - Always at Bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
