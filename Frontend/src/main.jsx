import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import Home from "./components/Home.jsx"
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import { createRoot } from 'react-dom/client'
import BrowseMovies from './components/BrowseMovies.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import SearchMovie from './components/SearchMovie.jsx'
import VideoPlay from './components/VideoPlay.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='browse-movies' element={< BrowseMovies />} />
      <Route path='search-movie' element={< SearchMovie />} />
      <Route path='play-movie' element={< VideoPlay />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="740266936099-4rhrdfhju7bi0006hqp125981f6nfvv0.apps.googleusercontent.com">
      <RouterProvider router={router}>
      </RouterProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
