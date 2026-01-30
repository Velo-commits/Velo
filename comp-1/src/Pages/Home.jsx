import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  
  // --- STATE 1: NAVIGATION ---
  // This remembers which tab is active: 'dashboard', 'users', or 'settings'
  const [activeTab, setActiveTab] = useState('dashboard')

  // --- STATE 2: TO-DO LIST (With Auto-Save) ---
  // Initialize from LocalStorage if available, otherwise use default
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks")
    return saved ? JSON.parse(saved) : ["Fix Login Bug", "Meeting with Team"]
  })
  
  const [newTask, setNewTask] = useState("")

  // Save to LocalStorage whenever 'tasks' changes
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks))
  }, [tasks])

  // Helper functions
  const addTask = () => {
    if (newTask !== "") {
      setTasks([...tasks, newTask])
      setNewTask("")
    }
  }
  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete))
  }

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div className="content-area">
           {/* Your original Dashboard Widgets */}
           <div className="widget">
            <h3>User Stats</h3>
            <p>Active Users: <strong>4</strong></p>
            <p>Revenue: <strong>$5,300</strong></p>
          </div>

          <div className="widget">
            <h3>Quick Tasks (Saved!)</h3>
            <div className="todo-input-group">
              <input 
                type="text" 
                placeholder="New Task..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <button className="primary" onClick={addTask}>Add</button>
            </div>
            <div>
              {tasks.map((task, index) => (
                <div key={index} className="todo-item">
                  <span>{task}</span>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>X</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else if (activeTab === 'users') {
      return (
        <div className="content-area" style={{ display: 'block' }}>
          <div className="widget">
            <h3>Full User Database</h3>
            <p>This is a separate view for managing users.</p>
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th></tr>
              </thead>
              <tbody>
                <tr><td>Alice</td><td>alice@test.com</td><td>Admin</td></tr>
                <tr><td>Bob</td><td>bob@test.com</td><td>Editor</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    } else if (activeTab === 'settings') {
      return (
        <div className="content-area" style={{ display: 'block' }}>
          <div className="widget">
             <h3>App Settings</h3>
             <p>Toggle Dark Mode (Coming Soon)</p>
             <button className="primary">Update Password</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="dashboard-container">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>COMP-1</h2>
        <div 
          className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </div>
        <div 
          className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </div>
        <div 
          className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </div>
        
        <div style={{ marginTop: 'auto' }} className="menu-item" onClick={() => navigate('/')}>
           Log Out
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="navbar">
          <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3> 
          <button className="primary">Profile</button>
        </div>
        
        {/* Dynamic Content Loader */}
        {renderContent()}

      </div>
    </div>
  )
}

export default Home