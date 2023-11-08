import React, { useState, useEffect } from 'react';
import './App.css';
import './UserList.css';
import axios from "axios";

function App() {
  const [isAddAssignVisible, setIsAddAssignVisible] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [group1Users, setGroup1Users] = useState([]);
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

  console.log(usersGroup);

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

  const handleAddToGroup1 = () => {
    setGroup1Users((prevGroup1Users) => [...prevGroup1Users, ...selectedUsers]);
    setSelectedUsers([]);
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


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import './UserList.css';
// import user_1 from './img/user_1.png';
// import user_2 from './img/user_2.png';
// import user_3 from './img/user_3.jpg';

// function App() {
//   const users = [
//     { id: 7, name: 'Кулик Олександр Вікторович', photo: user_1 },
//     { id: 45, name: 'Високий Степан Олександрович', photo: user_2 },
//     { id: 80, name: 'Ряба Наталя Олегівна', photo: user_3 },
//   ];

//   const [isAddAssignVisible, setIsAddAssignVisible] = useState({});
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   useEffect(() => {
//     console.log('Обрані користувачі змінились:', selectedUsers);
//   }, [selectedUsers]);

//   const handleMouseEnter = (userId) => {
//     setIsAddAssignVisible((prevState) => ({
//       ...prevState,
//       [userId]: true,
//     }));
//   };

//   const handleMouseLeave = (userId) => {
//     setIsAddAssignVisible((prevState) => ({
//       ...prevState,
//       [userId]: false,
//     }));
//   };

//   const handleAddToSelectedUsers = (user) => {
//     setSelectedUsers((prevUsers) => ({
//       ...prevUsers,
//       [user.id]: true,
//     }));
//     setIsButtonDisabled(true); // Відключаємо кнопку після натискання
//   };

//   return (
//     <div className="App">
//       <div className="user-list">
//         <center>
//           <h1>Список користувачів:</h1>
//         </center>
//         <ul>
//           {users.map((user) => (
//             <li
//               key={user.id}
//               className="user-item"
//               onMouseEnter={() => handleMouseEnter(user.id)}
//               onMouseLeave={() => handleMouseLeave(user.id)}
//             >
//               <div className="user_info">
//                 <div className="body_user-img">
//                   <img src={user.photo} alt={`user ${user.name}`} />
//                 </div>
//                 <span>{user.name}</span>
//               </div>
//               {isAddAssignVisible[user.id] && !selectedUsers[user.id] && (
//                 <button
//                   className="add-button"
//                   onClick={() => handleAddToSelectedUsers(user)}
//                   disabled={isButtonDisabled} // Включаємо або відключаємо кнопку
//                 >
//                   Додати до співрозмовників
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="selected-user">
//         <h2>Обрані користувачі:</h2>
//         <ul>
//           {Object.keys(selectedUsers).map((userId) => {
//             const selectedUser = users.find((user) => user.id === parseInt(userId));
//             return (
//               <li key={userId} title={selectedUser.name}>
//                   <div className="body_user-img">
//                     < img src={selectedUser.photo} alt={`user ${selectedUser.name}`} />
//                   </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;











// import React, { useState} from 'react';
// import './App.css';
// import './UserList.css';
// import user_1 from './img/user_1.png';
// import user_2 from './img/user_2.png';
// import user_3 from './img/user_3.jpg';

// function App() {

//   const users = [
//     { id: 7, name: 'Кулик Олександр Вікторович', photo: user_1},
//     { id: 45, name: 'Високий Степан Олександрович', photo: user_2},
//     { id: 80, name: 'Ряба Наталя Олегівна', photo: user_3},
// ];

//     const [isAddAssignVisible, setIsAddAssignVisible] = useState({});
    
//     const handleMouseEnter = (userId) => {
//         setIsAddAssignVisible((prevState) => ({
//         ...prevState,
//         [userId]: true,
//         }));
//     };
    
//     const handleMouseLeave = (userId) => {
//         setIsAddAssignVisible((prevState) => ({
//         ...prevState,
//         [userId]: false,
//         })); 
//     };
//   return (
//     <div className="App">
//         <div className="user-list">
//             <center><h1>Список користувачів:</h1></center>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.id} className="user-item" onMouseEnter={() => handleMouseEnter(user.id)} 
//                                                             onMouseLeave={() => handleMouseLeave(user.id)}>
//                     <div className="user_info">
//                       <div className="body_user-img">
//                         <img src={user.photo} alt={`user ${user.name}`} />
//                       </div>
//                       <span>{user.name}</span> 
//                     </div>
//                     {isAddAssignVisible[user.id] && (
//                         <button className="add-button" 
//                         onClick={() => console.log(`Користувач: із id-${user.id} ${user.name} доданий до співрозмовників`)}>
//                             Додати до співрозмовників
//                         </button>
//                     )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
      
//     </div>
//   );
// }

// export default App;




















// const codeCat = [100, 101, 102, 103, 200, 201, 202, 203, 204, 206, 207, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404];
// const [hoveredCat, setHoveredCat] = useState(null);

// const [todos, setTodos] = useState([]);
// const [newTodo, setNewTodo] = useState('');

// // const handleInputChange = (e) => {
// //   setNewTodo(e.target.value);
// // };

// const handleAddTodo = () => {
//   if (newTodo.trim() !== '') {
//     setTodos([...todos, newTodo]);
//     setNewTodo('');
//   }
// };



      // {/* <div>
      //   <input type="text" value={newTodo} onChange={handleInputChange} placeholder="Нове завдання" />
      //   <button onClick={handleAddTodo}>Додати</button>
      //   <ul>
      //     {todos.map((todo, index) => (
      //       <li key={index}>{todo}</li>
      //     ))}
      //   </ul>
      // </div> */}
      //       {/* <header className="App-header">
      //   {codeCat.map((cat) => (
      //     <div
      //       key={cat}
      //       className="photo-container"
      //       onMouseEnter={() => setHoveredCat(cat)}
      //       onMouseLeave={() => setHoveredCat(null)}
      //     >
      //       <img src={`https://http.cat/${cat}.jpg`} className="App-logo" alt={`cat-${cat}`} />
      //       {hoveredCat === cat && <img src="icon.png" className="icon" alt="icon" />}
      //     </div>
      //   ))}
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header> */}