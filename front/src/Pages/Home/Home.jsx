import { useState } from "react";
import Navbar from "../../components/header/Navbar";
import logo from '../../assets/react.svg';
import './Home.scss';

function Home () {
    return(
        <div>
            <Navbar />
            <div className="container">
                <img src={logo} alt="" />
                <img src={logo} alt="" />
                <img src={logo} alt="" />
                <img src={logo} alt="" />
                <img src={logo} alt="" />
                <img src={logo} alt="" />
                <img src={logo} alt="" />
            </div>
        </div>
    )
}

export default Home;