import { useState } from "react";
import './Home.scss';
import Modal from "../../components/modal/modal";

function Home({ isModalOpen, setIsModalOpen }) {
    return(
        <main className="home">
            <div className="home__list">
                {/* Votre contenu */}
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </main>
    )
}

export default Home;