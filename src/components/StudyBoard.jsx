import React from 'react';

const resources = [
  { title: "NCERT History (6th-12th)", category: "UPSC", type: "PDF" },
  { title: "Laxmikanth Polity Notes", category: "UPSC", type: "Notes" },
  { title: "Quantitative Aptitude Formulas", category: "Bank", type: "PDF" },
  { title: "Lucent GK Summary", category: "SSC", type: "Book" },
];

const StudyBoard = () => {
  return (
    <div className="material-container">
      <h2 style={{marginBottom: '20px'}}>📚 Study Library</h2>
      <div className="material-grid">
        {resources.map((res, index) => (
          <div key={index} className="resource-card">
            <div className="res-icon">📖</div>
            <div className="res-info"><h3>{res.title}</h3><span style={{fontSize:'0.8rem', color:'#666'}}>{res.category} • {res.type}</span></div>
            <button className="download-btn">Download ↓</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StudyBoard;