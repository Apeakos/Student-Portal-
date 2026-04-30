import React, { useState, useEffect } from 'react';
import Login from './Login';

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('studentPortalUser'); //uložení usera do state
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [subjects, setSubjects] = useState([]);

    const handleLogin = (userData) => {
        localStorage.setItem('studentPortalUser', JSON.stringify(userData));        //uložení do local storage
        setUser(userData);
    };
    const handleLogout = () => {
        localStorage.removeItem('studentPortalUser');
        setUser(null);
    };

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8081/api/students/${user.id}/subjects`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setSubjects(data);
                    } else {
                        setSubjects([]);
                    }
                })
                .catch(err => console.error("Chyba při načítání předmětů:", err));
        }
    }, [user]);

    //pokud user není lognutý, zobrazí se login
    if (!user) return <Login onLogin={handleLogin} />;

    return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
            <h1>Vítej v portálu, {user.firstName} {user.lastName}!</h1>

            <h3>Tvoje známky:</h3>
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '300px' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th>Předmět</th>
                    <th>Známka</th>
                </tr>
                </thead>
                <tbody>
                {subjects.map((sub, index) => (
                    <tr key={index}>
                        <td>{sub.name}</td>
                        <td>{sub.grade}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '5px 15px', cursor: 'pointer' }}>
                Odhlásit se
            </button>
        </div>
    );
}

export default App;