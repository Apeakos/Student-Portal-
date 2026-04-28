import React, { useState, useEffect } from 'react'; // Přidali jsme useEffect
import Login from './Login';

function App() {
    const [user, setUser] = useState(null);
    const [subjects, setSubjects] = useState([]); // Stav pro předměty

    useEffect(() => {
        if (user) {
            fetch('http://localhost:8081/api/students/${user.id}/subjects')
        .then(res => res.json())
                .then(data => setSubjects(data))
                .catch(err => console.error("Chyba při načítání předmětů:", err));
        }
    }, [user]);

    if (!user) return <Login onLogin={(userData) => setUser(userData)} />;

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

            <button onClick={() => setUser(null)} style={{ marginTop: '20px' }}>Odhlásit se</button>
        </div>
    );
}

export default App;