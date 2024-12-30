import React,{useState} from 'react';
import './analyse.css'; 

function Analyse() {

    const[input,setInput] = useState('');
   // const[output,setOutput] = useState([{}]);

   const handleInputChange = (e) =>
     { setInput(e.target.value); };

    const handleButtonClick = () => {
      
      console.log(input);
    }
    return( <div className="analyse-container">
      <h1>Analyse your dream</h1>
      <div className="input-container">
        <input type="text" value={input} onChange={handleInputChange} placeholder="Enter a short description" />
        <button className="send-button" onClick={handleButtonClick}>➤</button>
      </div>
      <div className="result-container">
        <p>your dream meaning is</p>
      </div>
      
    </div>);
}

export default Analyse;