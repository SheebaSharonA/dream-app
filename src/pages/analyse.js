import React, { useState } from 'react';
import './analyse.css'; 
import { HfInference } from "@huggingface/inference";

function Analyse() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleButtonClick = async () => {
        console.log(input);

        const client = new HfInference("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");

        const chatCompletion = await client.chatCompletion({
            model: "Qwen/QwQ-32B-Preview",
            messages: [
                {
                    role: "user",
                    content: "imagine you are a dream analyser and just give the interpretion of a dream about "+input // Using input value for dream analysis
                }
            ],
            max_tokens: 500
        });

        const result = chatCompletion.choices[0].message.content; // Access the content property
        console.log(result);
        setOutput(result); // Update the output state
    };

    return (
        <div className="analyse-container">
            <h1>Analyse your dream</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="Enter a short description" 
                />
                <button className="send-button" onClick={handleButtonClick}>➤</button>
            </div>
            <div className="result-container">
                <p>Your dream meaning is: {output}</p> {/* Display the result */}
            </div>
        </div>
    );
}

export default Analyse;
