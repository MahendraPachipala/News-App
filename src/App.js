import React, { useState, useEffect } from 'react';
import "./App.css"
import Routers from './Router/Router';
import { AuthProvider } from './config/AuthContext';
function App() {
   return(
   <AuthProvider>
    <Routers/>
   </AuthProvider>
   )
}

export default App;
