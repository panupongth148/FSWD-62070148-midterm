import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Postpage from './page/PostPage';
import Content from './page/Content';
import Author from './page/Author';
import Navigation from './component/navigation';

function App() {
  return (
    <Navigation />
  );
}

export default App;
