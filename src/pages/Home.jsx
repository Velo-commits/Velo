import { useState, useEffect } from 'react';
import { db, auth } from '../db/firebase';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Personal");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) { navigate('/'); return; }
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, [navigate]);

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    await addDoc(collection(db, "tasks"), {
      text: newTask,
      category: category,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });
    setNewTask("");
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <h2 className="logo">CloudTask</h2>
        <div className="user-info">
          <p>{auth.currentUser?.email}</p>
          <button onClick={() => signOut(auth)} className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="widget">
          <h1>My Tasks</h1>
          <form onSubmit={addTask} className="todo-input-group">
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What needs to be done?" />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Urgent">Urgent</option>
            </select>
            <button type="submit" className="primary-btn">Add Task</button>
          </form>

          <div className="todo-list">
            {tasks.map(t => (
              <div key={t.id} className="todo-item">
                <div className="task-info">
                  {/* THIS LINE LINKS TO THE CSS COLORS */}
                  <span className={`badge badge-${t.category?.toLowerCase()}`}>
                    {t.category}
                  </span>
                  <span className="task-text">{t.text}</span>
                </div>
                <button className="delete-btn" onClick={() => deleteDoc(doc(db, "tasks", t.id))}>×</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;