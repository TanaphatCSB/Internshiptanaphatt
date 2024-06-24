
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// userContext.js v2
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';


// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Fetch user data from an endpoint
//         axios.get('/api/user')
//             .then(response => {
//                 setUser(response.data);
//                 console.log("Fetched user data:", response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching user data:', error);
//             });
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };


//v3
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (userId) {
//       axios.get(`http://localhost:8081/api/register/${userId}`)
//         .then(response => {
//           setUser(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });
//     }
//   }, [userId]);

//   return (
//     <UserContext.Provider value={{ user }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
