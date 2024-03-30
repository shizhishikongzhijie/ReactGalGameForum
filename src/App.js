import './App.css';
import {Route, Routes } from "react-router-dom";
import Header from './layout/HeaderNav/header';
import Home from './pages/HomePage/home';
import Chat from './pages/ChatPage/chat';
import Search from './pages/SearchPage/search';
import User from './pages/UserPage/user';
import Article from './pages/ArticlePage/article';
import BottomNav from './layout/BottomNav/bottomNav';
import Three from './pages/ThreePage/three';
function App() {
  return (
    <>
        <Header />
          <Routes>
            <Route path="/App" element={<App />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/search" element={<Search searchContext="恋爱" />} />
            <Route path="/user" element={<User />} />
            <Route path="/articleread" element={<Article />} />
            <Route path="/three" element={<Three />} />
          </Routes>
        <BottomNav />
    </>
  );
}

export default App;
