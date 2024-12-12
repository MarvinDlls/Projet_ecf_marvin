import React from 'react';
import { Link } from 'react-router-dom';
import Back from '../../assets/back.svg';

const HomeLink = () => {
  return (
    <Link to={"/"}>
      <img className="icon" src={Back} alt="retour home" />
    </Link>
  );
};

export default HomeLink;