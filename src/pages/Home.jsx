import { db } from '../db/firebase' 
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Import our database connection and Firebase functions
import { collection, addDoc, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore'

function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // --- STATE FOR TASKS ---
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  // LOAD DATA FROM FIREBASE (Real-time)
  useEffect(() => {
    const q = query(collection(db, "tasks"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArray = []
      querySnapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id })
      })
      setTasks(tasksArray)
    })
    return () => unsubscribe()
  }, [])

  // ADD TASK TO FIREBASE
  const addTask = async () => {
    if (newTask.trim() !== "") {
      await addDoc(collection(db, "tasks"), {
        text: newTask,
        completed: false
      })
      setNewTask("")
    }
  }

  // DELETE TASK FROM FIREBASE
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id))
  }

  // RENDER LOGIC
  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div className="content-area">
          <div className="widget">
            <h3>Cloud Tasks (Synced to Mumbai ☁️)</h3>
            <div className="todo-input-group">
              <input 
                id="task-input"
                name="task-input"
                type="text" 
                placeholder="New Cloud Task..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <button className="primary" onClick={addTask}>Add</button>
            </div>
            <div>
              {tasks.map((task) => (
                <div key={task.id} className="todo-item">
                  <span>{task.text}</span>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>X</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    return <div className="content-area"><div className="widget"><h3>{activeTab} Page</h3><p>Content coming soon!</p></div></div>
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>CLOUD APP ☁️</h2>
        <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</div>
        <div className={`menu-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</div>
        <div style={{ marginTop: 'auto' }} className="menu-item" onClick={() => navigate('/')}>Log Out</div>
      </div>
      <div className="main-content">
        <div className="navbar"><h3>{activeTab}</h3><button className="primary">Profile</button></div>
        {renderContent()}
      </div>
    </div>
  )
}

export default Home; // This is the "VIP Pass" Netlify was looking for!