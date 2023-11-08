import React, { useState, useEffect } from 'react';
import './App.css';
import './UserList.css';
import axios from "axios";

function App() {
  
  const [isAddAssignVisible, setIsAddAssignVisible] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersGroup, setUsersGroup] = useState([]);
  const [dataSentToServer, setDataSentToServer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
    fetchData();
  }, []);


  const saveDataToServer = async () => {
    try {
      const response = await axios.post('http://localhost:3001/groups', {
        group1: {
          id: 1,
          users: selectedUsers,
        }
      });
      setDataSentToServer(!dataSentToServer);

      console.log('Дані успішно відправлені на сервер:', response.data);
    } catch (error) {
      console.error('Помилка відправки даних:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/groups');
        setUsersGroup(response.data.group1.users);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
    fetchData();
  }, [dataSentToServer]);

  // console.log(usersGroup);

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
      <div className='body-select-user'>
        <div className="user-list">
          <center>
            <h1>Список користувачів:</h1>
          </center>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onMouseEnter={() => handleMouseEnter(user.id)}
                onMouseLeave={() => handleMouseLeave(user.id)}
              >
                <div className="user_info">
                  <div className="body_user-img">
                    <img src={user.image} alt={`user ${user.name}`} />
                  </div>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                {isAddAssignVisible[user.id] && (
                  <button
                    className="add-button"
                    onClick={() => {
                      if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
                        setSelectedUsers((prevUsers) => [...prevUsers, user]);
                      }
                    }}
                  >
                    Додати до співрозмовників
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="selected-user">
          <div className='body-list-user'>
            <h2>Обрані користувачі:</h2>
            <ul className='list-selected-user'>
              {selectedUsers.map((user) => (
                <li key={user.id} title={`${user.firstName} ${user.lastName}`} >
                  <div className="body_user-img selected-user-img">
                    <img src={user.image} alt={`user ${user.name}`} />
                  </div>
                  <p>{user.firstName} {user.lastName}</p>
                </li>
              ))}
            </ul>
          </div>
          <button className="add-button button-selected" onClick={saveDataToServer}>
            Додати
          </button>
        </div>
      </div>
      <div className='group-users'>
        <h2>Користувачі групи 1:</h2>
        <ul className='list-group-1'>
          {usersGroup.map((user) => (
            <li key={user.id} title={`${user.firstName} ${user.lastName}`} >
              <div className="body_user-img group-user-img">
                <img src={user.image} alt={`user ${user.name}`} />
              </div>
              <p>{user.firstName} {user.lastName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;













