import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Main from './pages/Main';
// import Chat from './pages/Chat';
// import Page404 from './pages/Page404';
import Developing from './pages/developing';
import GlobalStyle from './globals';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Main />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/*" element={<Page404 />}></Route> */}
          <Route path="/*" element={<Developing />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
