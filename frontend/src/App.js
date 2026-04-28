import React, { useState } from 'react';
import Login from './Login';

function App() {

  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} />;
  }

  return (
      <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
        <h1>Vítej v portálu, {user.firstName} {user.lastName}!</h1>
        <p>Tvůj email: {user.email}</p>

        <hr style={{ margin: '20px 0' }} />

        <h3>Tvoje předměty:</h3>
        <p><i>(Tady v dalším kroku přidáme tabulku se známkami z databáze)</i></p>

        <button
            onClick={() => setUser(null)}
            style={{ marginTop: '20px', padding: '5px 15px', color: 'red' }}
        >
          Odhlásit se
        </button>
      </div>
  );
}

export default App;
