import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './features/Navigation/Navigation';
import { Tasks } from './features/Tasks/TasksPage';
import { TaskHistory } from './features/Tasks/TaskHistory/TaskHistory';
import { RewardsPage } from './features/Rewards/RewardsPage';




function App() {
  return (
    <BrowserRouter>
    <div className='App'>
       <Navigation />
       <div className="content">
         <Routes>
        <Route path="/" element={<Tasks/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/tasks/history" element={<TaskHistory/>}/>
        <Route path="/rewards" element={<RewardsPage/>}/>
      </Routes>
       </div>
     
    </div>
     
    </BrowserRouter>
  
  );
}

export default App;
