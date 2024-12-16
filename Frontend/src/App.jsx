import { useState } from "react"
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import InfoContext from "./useInfoContext/InfoContext.js"

function App() {

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchBar, setSearchBar] = useState(false);


  return (
    <>
      <Provider store={store}>
        <InfoContext.Provider value={{ email, setEmail, fullName, setFullName, password, setPassword, username, setUsername, isLoggedIn, setIsLoggedIn, searchBar, setSearchBar }}>
          <Header />
          <Outlet />
          <Footer />
        </InfoContext.Provider>
      </Provider>
    </>
  )
}

export default App;
