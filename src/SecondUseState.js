import React, { useState} from 'react';
import './App.css';
import './UserList.css';
import user_1 from './img/user_1.png';
import user_2 from './img/user_2.png';
import user_3 from './img/user_3.jpg';

function FirstUseEffect() {

const users = [
    { id: 7, name: 'Кулик Олександр Вікторович', photo: user_1},
    { id: 45, name: 'Високий Степан Олександрович', photo: user_2},
    { id: 80, name: 'Ряба Наталя Олегівна', photo: user_3},
];

const [isAddAssignVisible, setIsAddAssignVisible] = useState({});

const handleMouseEnter = (userId) => {
    setIsAddAssignVisible((prevState) => ({
    ...prevState,
    [userId]: true,
    }));
};

const handleMouseLeave = (userId) => {
    setIsAddAssignVisible((prevState) => ({
    ...prevState,
    [userId]: false,
    })); 
};
return (
    <div className="App">
        <div className="user-list">
            <center><h1>Список користувачів:</h1></center>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="user-item" onMouseEnter={() => handleMouseEnter(user.id)} 
                                                            onMouseLeave={() => handleMouseLeave(user.id)}>
                    <div className="user_info">
                        <div className="body_user-img">
                            <img src={user.photo} alt={`user ${user.name}`} />
                        </div>
                        <span>{user.name}</span> 
                    </div>
                    {isAddAssignVisible[user.id] && (
                        <button className="add-button" 
                        onClick={() => console.log(`Користувач: із id-${user.id} ${user.name} доданий до співрозмовників`)}>
                            Додати до співрозмовників
                        </button>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    
    </div>
    );
}

export default FirstUseEffect;