import React from 'react';
import "./home.css";
import { useState, useEffect } from "react";

function Home() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [data,setdata] = useState([{}])

  useEffect(()=>{
        fetch("/quote").then(
          res => res.json()
        ).then(
            data => {
              setdata(data)
              console.log(data)
            }
        )
  },[])


  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Toggle the flipped state
  };

    return( <div className="home-container">
      <h1 className="home-heading">
        Unlock the secrets of your dreams and track your mood journey—understand yourself better, one night and one day at a time
         </h1>
        
    <div className="card-container">
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          
          <p>Tap the card, let magic play—unlock a quote to brighten your day!</p>
          <button className="flip-button" onClick={handleFlip}>
            Reveal
          </button>
        </div>
          <div className="card-back">
            <h2>Brighten Your Day!</h2>
            {(typeof data.quote_data === 'undefined')?
           (<p>loading...</p>):
              (<p>{data.quote_data[0]}</p>)
            }
           
          </div>
      </div>
    </div>
    <div>
    </div>


    <div className="analyse-card">
       <h3>
       Curious about the meaning of your dreams? Click the button below to uncover their secrets!
        </h3>
        <button>
          <a className="nav-link" href="/analyse" > Analyse</a>
        </button>
      </div>
    
    </div>);
}
//Tap the card, let magic play—unlock a quote to brighten your day!
export default Home;