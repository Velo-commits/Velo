import { useState, useEffect } from 'react';
import { db, auth } from '../db/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  where 
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Personal");
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if user is logged in
    if (!auth.currentUser) {
      navigate('/');
      return;
    }

    // 2. Query only THIS user's tasks
    const q = query(
      collection(db, "tasks"), 
      where("userId", "==", auth.currentUser.uid)
    );

    // 3. Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, [navigate]);

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    
    try {
      await addDoc(collection(db, "tasks"), {
        text: newTask,
        category: category,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <h2 className="logo">CloudTask</h2>
        <div className="user-info">
          <p>Logged in as:</p>
          <p><strong>{auth.currentUser?.email}</strong></p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <main className="main-content">
        <div className="widget">
          <h1>My Tasks</h1>
          
          <form onSubmit={addTask} className="todo-input-group">
            <input 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder="What needs to be done?" 
            />
            
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Urgent">Urgent</option>
            </select>
            
            <button type="submit" className="primary-btn">Add Task</button>
          </form>

          <div className="todo-list">
            {tasks.length === 0 && <p style={{color: '#94a3b8', textAlign: 'center'}}>No tasks yet. Add one above!</p>}
            
            {tasks.map(t => (
              <div key={t.id} className="todo-item">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {/* CRITICAL: This class logic matches the CSS */}
                  <span className={`badge badge-${t.category ? t.category.toLowerCase() : 'personal'}`}>
                    {t.category}
                  </span>
                  <span>{t.text}</span>
                </div>
                
                <button 
                  className="delete-btn" 
                  onClick={() => deleteDoc(doc(db, "tasks", t.id))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;