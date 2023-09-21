import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface P {
  isLoggedIn: boolean;
  handleLogout: () => Promise<void>;
}

const GlobalHeader: FC<P> = ({ isLoggedIn, handleLogout }) => {
  return (
    <header className="global-header">
      <div className="button-group">
        {!isLoggedIn ? (
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
        ) : (
          <>
            <Link to="/likedsong" className="btn">
              Liked Song
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;
