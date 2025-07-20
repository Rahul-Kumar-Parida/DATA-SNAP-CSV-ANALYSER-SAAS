import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import SummaryReport from "./components/SummaryReport";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  React.useEffect(() => {
    let interval;
    if (loading) {
      setTimer(0);
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home">
          <h1 className="main-title">Welcome to DataSnap</h1>
          <p className="subtitle">
            Instantly analyze your CSV or Excel files and get deep insights!
          </p>
          <FileUpload onResult={setSummary} setLoading={setLoading} />
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <div className="loading-text">
                Analyzing... <span>{timer}s</span>
              </div>
            </div>
          )}
          {!loading && summary && <SummaryReport summary={summary} />}
        </section>
        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p>
            For support or feedback, email us at <a href="mailto:support@datasnap.com">support@datasnap.com</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;