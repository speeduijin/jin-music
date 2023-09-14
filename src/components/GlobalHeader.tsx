import React from 'react';
import { Link } from 'react-router-dom';

const GlobalHeader = () => {
  return (
    <header className="global-header">
      <div className="button-group">
        <Link to="/login" className="btn-login">
          Login
        </Link>
      </div>
    </header>
  );
};

export default GlobalHeader;
