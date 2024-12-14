import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import ManageWeapons from './pages/manageWeapons/ManageWeapons'
import WeaponDetail from './pages/WeaponDetail/WeaponDetails'
import IssuedWeapons from './pages/issuedWeapons/IssuedWeapons'
import NewWeapon from './pages/newWeapon/NewWeapon'
import NewOfficer from './pages/NewOfficer/NewOfficer'
import ManageOfficers from './pages/manageOfficers/ManageOfficers'
import EditOfficer from './pages/manageOfficers/EditOfficer'
import IssueWeapon from './pages/issueWeapon/IssueWeapon'
import ReturnWeapon from './pages/ReturnWeapon/ReturnWeapon'
import WeaponsList from './pages/WeaponsList/WeaponsList'
import Maintanance from './pages/maintanance/Maintanance'
import Audit from './pages/audit/Audit'

function App() {
  return (
   <section className="app container-fluid">
    <div className="row">
      <div className="col-md-3 p-0">
          <div className="sidebar p-3">
           <div className='d-flex gap-2 align-items-center '>
           <img src="https://codervent.com/maxton/demo/vertical-menu/assets/images/logo-icon.png" alt="karnataka state police" className='logo' />
           <h1 className="fs-4 text-white m-0">KSP ARMOURY</h1>
           </div>
            <ul>
              <li><a href="/"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
              <li><a href="/manage/weapons"><i class="bi bi-box-seam"></i> Manage Weapons</a></li>
              <li><a href="/manage/officers"><i class="bi bi-people"></i> Manage Officers</a></li>
              <li><a href="/issued/weapon"><i class="bi bi-arrow-up-right-circle"></i> Issued Weapons</a></li>
              {/* <li><a href="/issue/weapon"><i class="bi bi-arrow-up-right-circle"></i> Issue Weapons</a></li> */}
              <li><a href="/weapon/list"><i class="bi bi-arrow-down-left-circle"></i> Return Weapons</a></li>
              <li><a href="/"><i class="bi bi-shield-lock"></i> Fixed Weapons</a></li>
              <li><a href="/"><i class="bi bi-archive"></i> Ammunition Stock</a></li>
              <li><a href="/maintanance/logs"><i class="bi bi-tools"></i> Maintenance Logs</a></li>
              <li><a href="/audit/logs"><i class="bi bi-journal-check"></i> Audit / Inspection Logs</a></li>
              <li><a href="/"><i class="bi bi-graph-up"></i> Reports & Analytics</a></li>
            </ul>

          </div>
      </div>
      <div className="col-md-9 p-0">
        <div className="main">
            <div className="main-content">
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/manage/weapons' element={<ManageWeapons/>}/>
                <Route path='/manage/officers' element={<ManageOfficers/>}/>
                <Route path='/weapon/:id' element={<WeaponDetail/>}/>
                <Route path='/issued/weapon' element={<IssuedWeapons/>}/>
                <Route path='/issue/weapons/:officerId' element={<IssueWeapon/>}/>
                <Route path='/new/weapon' element={<NewWeapon/>}/>
                <Route path='/new/officers' element={<NewOfficer/>}/>
                <Route path='/edit/officer/:id' element={<EditOfficer/>}/>
                <Route path='/return/weapon/:transactionId' element={<ReturnWeapon/>}/>
                <Route path='/weapon/list' element={<WeaponsList/>}/>
                <Route path='/maintanance/logs' element={<Maintanance/>}/>
                <Route path='/audit/logs' element={<Audit/>}/>
              </Routes>
            </BrowserRouter>
            </div>
        </div>
      </div>
    </div>
   </section>
  )
}

export default App