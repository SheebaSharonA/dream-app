import React from 'react';
import './App.css';
import Navbar from './compontents/navbar';
import Analyse from './pages/analyse';
import Diary from './pages/diary';
import Home from './pages/home';
function App() {

  let compontent = <Home />
  //console.log(window.location.pathname)
  switch(window.location.pathname){
    case '/analyse':
      compontent = <Analyse />
      break;
    
    case '/diary':
      compontent = <Diary />
      break;

    case '/Home':
      compontent = <Home />
      break;
    default:
      break;
  }
     //compontent = <Analyse />
  return (
    <div className="App">
     <Navbar />
     {compontent }
    </div>
  );
}

export default App;