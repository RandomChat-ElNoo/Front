import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Chat from './pages/Chat';
import GlobalStyle from './globals';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
