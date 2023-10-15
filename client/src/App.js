import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedPage from './components/ProtectedPage';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import AddCourse from './pages/addCourse';
import PreviewDetail from './pages/previewDetails';
import ShowCourse from './pages/showCourse';

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
      <Routes>
        <Route path='/add-course' element={<AddCourse/>}/>
        <Route path='/show-course' element={<ShowCourse/>}/>
        <Route path='/preview-detail' element={<ProtectedPage><PreviewDetail/></ProtectedPage>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
