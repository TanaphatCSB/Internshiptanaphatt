// UserList.js
import React from 'react';
import '../css/adminhome.css';

const UserList = ({ users, onUserClick }) => {
    return (
        <div>
            <h2 className='userlist'>User List</h2>
            <ul className='listassignadmin'>
                {users.map(user => (
                    <li key={user.user_id} onClick={() => onUserClick(user.user_id)}>
                        {/* {user.name} */}
                        <a href="#" onClick={() => onUserClick(user.user_id)}>
                            {user.name}  {user.surname}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

// import React from 'react';
// import '../css/adminhome.css';

// const UserList = ({ users, onUserClick, userInfo }) => {
//     return (
//         <div>
//             <h2 className='userlist'>User List</h2>
//             <ul className='listassignadmin'>
//                 {users.map(user => (
//                     <li key={user.user_id} onClick={() => onUserClick(user.user_id)}>
//                         <a href="#" onClick={(e) => { e.preventDefault(); onUserClick(user.user_id); }}>
//                             {user.name} {user.surname}
//                         </a>
//                         {userInfo.length > 0 && userInfo[0].user_id === user.user_id && (
//                             <ul>
//                                 {userInfo.map(info => (
//                                     <li key={info.sticker}>{info.sticker}</li>
//                                 ))}
//                             </ul>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;
