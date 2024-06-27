import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css";
import axios from 'axios';
import User from './userhome';
import { UserContext } from './userContext';

export default function MyUsers() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [userStickers, setUserStickers] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8081/getUserStickers/${user.userid}`)
        .then(response => {
          setUserStickers(response.data);
        })
        .catch(error => {
          console.error('Error fetching user stickers:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate('/login');
      }
    }
  }, [user, navigate, setUser]);

  if (!user) {
    return null;
  }

  // Filter out duplicate stickers
  const uniqueUserStickers = [...new Set(userStickers.map(sticker => sticker.sticker))];

  return (
    <div>
      <User />
      <div className="condiv user-stickers">
        <h3>สติ๊กเกอร์ของคุณ: {user.userid}</h3>
        {uniqueUserStickers.length > 0 ? (
          <ul className="listassign">
            {uniqueUserStickers.map(sticker => (
              <li key={sticker}>
                <a href={`/userdevices/${sticker}`}>{sticker}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>คุณยังไม่มีสติ๊กเกอร์</p>
        )}
      </div>
    </div>
  );
}




