import './App.css';
import CoffeeList from './components/CoffeeList';
import TeaList from './components/TeaList';
import { BrowserRouter, Route, Routes, Link, } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='section'>
          <Link to="/kahvit" className="routerLink">Kahvi</Link>{' '}
          <Link to="/teet" className="routerLink">Tee</Link>{' '}
        </div>
        <Routes>
          <Route path="/" element={<CoffeeList />} />
          <Route path="/kahvit" element={<CoffeeList />} />
          <Route path="/teet" element={<TeaList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
