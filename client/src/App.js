import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider,useAuth } from './Componanet/AuthContext';
import AddBooks from "./Componanet/AddBooks";
import GetBooks from "./Componanet/GetBooks";
import Login from "./Componanet/Login";
import Signup from "./Componanet/Signup";
import Home from './Componanet/Home';
import Update from "./Componanet/Update";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Addbooks" element={<ProtectedRoute/>}/>
            <Route path="/Getbooks" element= {<GetBooks/>} />
            <Route path='/edit/:id' element={<Update />}></Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <AddBooks/>;
};

export default App;
