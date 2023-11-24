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
import GamePage from "./pages/GamePage";
import Badges from "./pages/Badges";
import Events from "./pages/Events";
import GamesClient from "./pages/GamesClient";
import EventAdd from "./pages/EventAdd";
import EventModal from "./pages/EventModal";

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
              <Route path='/games/add' element={<GamePage type='add' />} />
              <Route path='/games/:id/view' element={<GamePage type='view' />} />
              <Route path='/games/:id/edit' element={<GamePage type='edit' />} />
              <Route path='/badges' element={<Badges />} />
              <Route path='/events' element={<Events />} />
              <Route path='/event/:id' element={<EventModal />} />
              <Route path='/events/add' element={<EventAdd />} />
              <Route path='/client/games' element={<GamesClient />} />
            </Routes>
          </div>
        </Router>
      </>
  );
}

export default App;