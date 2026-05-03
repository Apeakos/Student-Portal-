import React, { useState, useEffect } from 'react';
import Login from './Login';
import './App.css';

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('studentPortalUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });



    const [subjects, setSubjects] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newGrade, setNewGrade] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');

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
            if (user.role === 'TEACHER') {
                //Pokud je učitel, stáhneme seznam všech žáků do roletky
                fetch('http://localhost:8081/api/students')
                    .then(res => res.json())
                    .then(data => {
                        const studentsOnly = data.filter(s => s.role === 'STUDENT' || !s.role);
                        setAllStudents(studentsOnly);
                        if(studentsOnly.length > 0) setSelectedStudentId(studentsOnly[0].id); // Předvybere prvního
                    })
                    .catch(err => console.error("Chyba:", err));
            } else {
                //Pokud je student, stáhne jen jeho známky
                fetch(`http://localhost:8081/api/students/${user.id}/subjects`)
                    .then(res => res.json())
                    .then(data => setSubjects(Array.isArray(data) ? data : []))
                    .catch(err => console.error("Chyba:", err));
            }
        }
    }, [user]);

    //Odeslání známky na server
    const handleAddGrade = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8081/api/students/${selectedStudentId}/subjects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newSubjectName, grade: parseInt(newGrade) })
        });

        if (response.ok) {
            alert("Známka byla úspěšně zapsána!");
            setNewSubjectName('');
            setNewGrade('');
        } else {
            alert("Něco se pokazilo při zápisu známky.");
        }
    };

    if (!user) return <Login onLogin={handleLogin} />;

    return (
        <div>
            <nav className="navbar">
                <h2> Studentský Portál</h2>
                <button onClick={handleLogout} className="btn btn-danger">Odhlásit se</button>
            </nav>

            <div className="portal-container">
                <h2>Vítej, {user.firstName}! 👋 {user.role === 'TEACHER' ? '(Učitelský přístup)' : ''}</h2>

                {user.role === 'TEACHER' ? (
                    <div className="grades-card">
                        <h3>Zapsat novou známku</h3>
                        <form onSubmit={handleAddGrade} style={{ marginTop: '1.5rem' }}>
                            <div className="input-group">
                                <label>Vyber studenta:</label>
                                <select
                                    value={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                >
                                    {allStudents.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.firstName} {student.lastName} ({student.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Název předmětu (např. Dějepis):</label>
                                <input type="text" value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label>Známka (1-5):</label>
                                <input type="number" min="1" max="5" value={newGrade} onChange={(e) => setNewGrade(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn">Zapsat do databáze</button>
                        </form>
                    </div>
                ) : (
                    <div className="grades-card">
                        <h3>Přehled klasifikace</h3>
                        <table className="grades-table">
                            <thead>
                            <tr><th>Předmět</th><th>Známka</th></tr>
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
                )}
            </div>
        </div>
    );
}

export default App;