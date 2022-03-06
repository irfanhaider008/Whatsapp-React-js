import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './components/Login';
import {useStateValue} from './components/StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue();
  return ( 
    <div className="app">
      

      {!user ? (
          <Login/>
        ):(

<div className="app_body">

<Router>
  <Sidebar />
  <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/rooms/:roomId" element={<Chat />} />
  </Routes>
</Router>
</div>
       )}

       
    </div>
  );
}
export default App;