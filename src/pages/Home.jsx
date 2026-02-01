import { useState, useEffect } from 'react';
import { db, auth } from '../db/firebase';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc, serverTimestamp, where } from 'firebase/firestore';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Personal"); // New Feature: Category state

  useEffect(() => {
    if (!auth.currentUser) return;
    // Only fetch tasks belonging to YOU
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
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
    <div className="main-content">
      <div className="widget">
        <h2>My Tasks</h2>
        <div className="todo-input-group">
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New task..." />
          
          {/* Category Dropdown */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Urgent">Urgent</option>
          </select>
          
          <button className="primary-btn" onClick={addTask}>Add</button>
        </div>

        <div className="todo-list">
          {tasks.map(t => (
            <div key={t.id} className="todo-item">
              <span><strong>[{t.category}]</strong> {t.text}</span>
              <button onClick={() => deleteDoc(doc(db, "tasks", t.id))}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;