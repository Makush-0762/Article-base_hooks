import React, { useState } from "react";
import './UserList.css';

export default function FirstUseState() {
    const [content, setContent] = useState('');

    const handleInputChange = (e) => {
        setContent(e.target.value);
    }

    return (
        <div className="App">
            <div style={{border: '1px solid black', padding: '20px', margin: '20px'}}>
                <h2>Зміст коробки</h2>
                <input type="text" value={content} onChange={handleInputChange} placeholder="Введіть текст"/>
                <div style={{margin: "10px", fontSize: '10px'}}>{content}</div>
            </div>
        </div>
    )


} 