import React, { useState } from 'react';

function Login({ onLogin }) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');

        try {

            const response = await fetch('http://localhost:8081/api/auth/login', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ email: email, password: password })

            });

            if (response.ok) {

                const userData = await response.json();

                onLogin(userData);

            } else {

                setError('Špatný email nebo heslo');

            }

        } catch (err) {

            setError('Chyba při připojování k serveru');

        }

    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
            <h2>Přihlášení do Studentského Portálu</h2>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label><br />
                    <input

                        type="email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                        style={{ width: '200px', padding: '5px' }}

                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Heslo:</label><br />
                    <input

                        type="password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                        style={{ width: '200px', padding: '5px' }}

                    />
                </div>

                {error && <p style={{ color: 'red', margin: '0 0 10px 0' }}>{error}</p>}
                <button type="submit" style={{ width: '100%', padding: '8px', cursor: 'pointer' }}>

                    Přihlásit se
                </button>
            </form>
        </div>

    );

}

export default Login;
