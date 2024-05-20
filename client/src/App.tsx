import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'
import HomePage from './components/HomePage'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';



function App() {

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
