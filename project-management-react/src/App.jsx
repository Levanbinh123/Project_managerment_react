import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Subscription from './pages/Subscription/Subscription'
import Auth from './pages/Auth/Auth'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "@/Redux/Auth/Action.js";
import {fetchProjects} from "@/Redux/Project/Action.js";
import UpgradeSuccess from "@/pages/Subscription/UpgradeSuccess.jsx";

function App() {
const dispatch=useDispatch();
const{auth}=useSelector(store=>store);
  useEffect(()=>{
    dispatch(getUser());
    if(auth.jwt){
      dispatch(fetchProjects());}
  },[auth.jwt,dispatch]);
  return (
    <>
    {
      auth.user?<div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/project/:id' element={<ProjectDetails/>}  />
        <Route path='/project/:projectId/issue/:issueId' element={<IssueDetails/>}  />
        <Route path='/upgrade_plan' element={<Subscription/>}  />
        <Route path='/upgrade/success' element={<UpgradeSuccess/>}  />
      </Routes>
    </div>:<Auth/>
    }

    </>
  )
}

export default App
