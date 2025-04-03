import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth/login' element={<Login />} />
        <Route path='auth/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
