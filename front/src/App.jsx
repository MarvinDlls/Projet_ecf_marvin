import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home/Home';
import Favourite from './Pages/Favourites/Favourites';
import Navbar from './components/header/Navbar';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar openModal={() => setIsModalOpen(true)} />
        <Routes>
          <Route path='/' element={<Home isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} />
          <Route path='/favoris' element={<Favourite />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
