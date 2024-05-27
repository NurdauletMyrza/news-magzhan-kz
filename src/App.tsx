import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import "./App.css";

const App: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("");

  return (
    <Router>
      <Header selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <main>
        <Routes>
          <Route path="/news-magzhan-kz" element={<NewsList />} />
          <Route path="/news-magzhan-kz/search/:searchValue" element={<NewsList />} />
          <Route path="/news-magzhan-kz/tag/:tagValue" element={<NewsList />} />
          <Route path="/news-magzhan-kz/news/:id" element={<NewsDetail />} />
          <Route path="/search/:searchValue" element={<Navigate to="/news-magzhan-kz№search/:searchValue" />} />
          <Route path="/tag/:tagValue" element={<Navigate to="/news-magzhan-kz/tag/:tagValue" />} />
          <Route path="/news/:id" element={<Navigate to="/news-magzhan-kz/news/:id" />} />
          <Route path="/" element={<Navigate to="/news-magzhan-kz" />} />
        </Routes>
      </main>
      <Footer selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
    </Router>
  );
};

export default App;
