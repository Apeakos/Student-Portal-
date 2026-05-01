import React, { useState, useEffect } from 'react';
import Login from './Login';
import './App.css';

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('studentPortalUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [subjects, setSubjects] = useState([]);

    const handleLogin = (userData) => {
        localStorage.setItem('studentPortalUser', JSON.stringify(userData));
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

    if (!user) return <Login onLogin={handleLogin} />;

    return (
        <div>
            <nav className="navbar">
                <h2>🎓 Studentský Portál</h2>
                <button onClick={handleLogout} className="btn btn-danger">
                    Odhlásit se
                </button>
            </nav>
            <div className="portal-container">
                <h2>Vítej zpět, {user.firstName}! 👋</h2>

                <div className="grades-card">
                    <h3>Přehled klasifikace</h3>
                    <table className="grades-table">
                        <thead>
                        <tr>
                            <th>Předmět</th>
                            <th>Známka</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subjects.length > 0 ? subjects.map((sub, index) => (
                            <tr key={index}>
                                <td>{sub.name}</td>
                                <td><span className="grade-badge">{sub.grade}</span></td>
                            </tr>
                        )) : <tr><td colSpan="2">Zatím žádné známky.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;