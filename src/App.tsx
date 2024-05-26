// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";

const App: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("");

  return (
    <Router>
      <Header selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <main>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/search/:searchValue" element={<NewsList />} />
          <Route path="/tag/:tagValue" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>
      <Footer selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
    </Router>
  );
};

export default App;
