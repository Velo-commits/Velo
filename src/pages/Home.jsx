import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Import the database connection we set up in firebase.js
import { db } from '../db/firebase' 
// Import Firebase tools for Auth and Firestore
import { getAuth, signOut } from 'firebase/auth'
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore'

function Home() {
  const navigate = useNavigate()
  const auth = getAuth()
  
  // --- STATE ---
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  // 1. LISTEN TO FIREBASE (Real-time sync from Mumbai)
  useEffect(() => {
    // This tells Firebase: "Watch the 'tasks' collection for any changes"
    const q = query(collection(db, "tasks"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArray = []
      querySnapshot.forEach((doc) => {
        // We include the doc.id so we know which one to delete later
        tasksArray.push({ ...doc.data(), id: doc.id })
      })
      setTasks(tasksArray)
    })

    // Clean up the listener when the page closes
    return () => unsubscribe()
  }, [])

  // 2. ADD A TASK
  const [category, setCategory] = useState("Personal"); // New state

const addTask = async (e) => {
  if (e) e.preventDefault();
  if (newTask.trim() !== "") {
    await addDoc(collection(db, "tasks"), {
      text: newTask,
      category: category, // Saving the category
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });
    setNewTask("");
  }
};


  // 3. DELETE A TASK
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id))
    } catch (error) {
      console.error("Error deleting task: ", error)
    }
  }

  // 4. LOGOUT LOGIC
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/') // Send user back to Login page
    })
  }

  // 5. THE VIEW (JSX)
  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <div className="logo-section">
          <h2>CLOUD APP ☁️</h2>
          <p>Logged in as: {auth.currentUser?.email}</p>
        </div>
        <nav className="menu">
          <div className="menu-item active">Dashboard</div>
          <div className="menu-item">Settings</div>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <header className="navbar">
          <h1>My Tasks</h1>
        </header>

        <div className="content-area">
          <div className="widget">
            <div className="todo-input-group">
             <input 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                placeholder="New task..." 
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Urgent">Urgent</option>
            </select>
            <button onClick={addTask}>Add</button>
            </div>

            <div className="todo-list">
              {tasks.length === 0 ? (
                <p className="empty-msg">No tasks yet. Add one above!</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="todo-item">
                    <span>{task.text}</span>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteTask(task.id)}
                      title="Delete Task"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// THE EXPORT (Always at the very bottom!)
export default Home;