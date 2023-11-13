import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import React from 'react';
import {Toaster} from "react-hot-toast";
import Landing from "./pages/Landing";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import Games from "./pages/Games";
import GamesAdd from "./pages/GamesAdd";
import Badges from "./pages/Badges";

function App() {
  return (
      <>
        <Router>
          <div className='.root-container'>
            <div></div>
            <Toaster/>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/client' element={<Client />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/account' element={<Account />} />
              <Route path='/games' element={<Games />} />
              <Route path='/games/add' element={<GamesAdd />} />
              <Route path='/badges' element={<Badges />} />
            </Routes>
          </div>
        </Router>
      </>
  );
}

export default App;