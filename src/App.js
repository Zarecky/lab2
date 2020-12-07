import { useCallback, useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI } from './api';

const VK = window.VK

function App() {
  const [name, setName] = useState('')

  useEffect(() => {
    VK.Observer.subscribe('auth.login', ({ session: { user } }) => {
      setName(user.first_name + ' ' + user.last_name)
    })

    VK.init({
      apiId: CLIENT_ID
    });
  }, [])

  const handleLoginButton = useCallback(async () => {
    VK.Auth.login()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleLoginButton}>Войти через VK</button>
        {name && (
          <h1>{name}</h1>
        )}
      </header>
    </div>
  );
}

export default App;
