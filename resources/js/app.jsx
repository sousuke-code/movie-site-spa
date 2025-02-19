/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
*/

import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import './components/Example';
import '../css/app.css';
import ReactDOM from "react-dom/client";
import { render } from 'react-dom';
import AllView from './pages/AllView';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MovieShow from './pages/MovieShow';
import PageHeader from './layouts/PageHeader';
import MoviesSearch from './pages/MoviesSearch';
import Login from './pages/Login';
import Register from './pages/Register';
import Auth from "./pages/Auth";
import HomePage from './pages/HomePage';
import TheaterView from './pages/TheaterView';
import { useEffect,useState } from 'react';
import axios from 'axios';




function App() {
  const [user, setUser] = useState(null);
  const [locading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
   axios.get('/sanctum/csrf-cookie')
     .then(() => axios.get('/api/user'))
     .then(res => {
      setUser(res.data.user);
     })
     .catch(() => {
      console.log('Not logged in');
      setUser(null);
     })
  }, []);
  return (
    <BrowserRouter>
      <PageHeader user={user}/>
      <Routes>
        <Route path="/" element={<AllView user={user}/>} />
        <Route path='/movie/show/:id' element={<MovieShow />} />
        <Route path='/movie/search' element={<MoviesSearch />} />
        <Route path='/login' element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/register' element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
				<Route path="/theater" element={<TheaterView/>}/>

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
