import './App.css';
import CoffeeList from './components/CoffeeList';
import TeaList from './components/TeaList';
import { BrowserRouter, Route, Routes, Link, } from 'react-router-dom';

function App() {
  
  /*
  fetch('http://localhost:8080/api/teas')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error');
    }
    return response.json();
  })
  .then(data => {
    console.log(data._embedded.teas);
  })
  .catch(error => {
    console.error('There was a problem with the Fetch operation:', error);
  });
  */

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
