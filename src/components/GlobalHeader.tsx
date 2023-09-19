import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GlobalHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/auth/isloggedin');
        setIsLoggedIn(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status < 500) {
            const message: string = error.response?.data.message;
            return message;
          } else {
            throw new Response();
          }
        }
      }
    })();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const res = await axios.get('/auth/logout');
    setIsLoggedIn(false);
  };

  return (
    <header className="global-header">
      <div className="button-group">
        {!isLoggedIn ? (
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-logout"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;
