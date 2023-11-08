import React, {useState} from "react";
import './UserList.css';

export default function Users(){

      // const [content, setContent] = useState('');

  // const handleInputChange = (e) => {
  //   setContent(e.target.value);
  // };

    const users = [
        { id: 1, name: 'User 1', photo: 'user1.jpg', bio: 'Біографія користувача 1' },
        { id: 2, name: 'User 2', photo: 'user2.jpg', bio: 'Біографія користувача 2' },
        { id: 3, name: 'User 3', photo: 'user3.jpg', bio: 'Біографія користувача 3' },
        // Додайте більше користувачів за потреби
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
        <div className="user-list">
        {/* <div style={{ border: '1px solid black', padding: '20px', marginTop: '20px' }}>
        <h2>Зміст коробки</h2>
        <input type="text" value={content} onChange={handleInputChange} placeholder="Введіть текст" />
        <div style={{ marginTop: '10px', fontSize: '18px' }}>{content}</div>
        {Users}
        </div> */}
            <h1>Список користувачів:</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="user-item" onMouseEnter={() => handleMouseEnter(user.id)} 
                                                            onMouseLeave={() => handleMouseLeave(user.id)}>
                    {user.name}
                    {isAddAssignVisible[user.id] && (
                        <button className="add-button" onClick={() => console.log(`Користувач ${user.name} доданий до співрозмовників`)}>
                            Додати до співрозмовників
                        </button>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    )
}