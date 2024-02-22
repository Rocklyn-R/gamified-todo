import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './features/Navigation/Navigation';
import { Tasks } from './features/Tasks/TasksPage';
import { TaskHistory } from './features/Tasks/TaskHistory/TaskHistory';
import { RewardsPage } from './features/Rewards/RewardsPage';
import { InventoryPage } from './features/Rewards/Inventory/InventoryPage';
import { RewardHistory } from './features/Rewards/Inventory/RewardHistory/RewardHistory';




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
        <Route path="/rewards/inventory" element={<InventoryPage/>} />
        <Route path="/rewards/inventory/history" element={<RewardHistory/>} />
      </Routes>
       </div>
     
    </div>
     
    </BrowserRouter>
  
  );
}

export default App;
