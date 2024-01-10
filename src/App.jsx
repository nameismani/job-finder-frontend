import { useEffect, useState } from 'react'

import './App.css'
import { Footer, Navbar } from './components'
import { Route, Routes,Navigate,useLocation, Outlet } from 'react-router-dom'
import { About, Auth, Companies, CompanyProfile, FindJob, JobDetail, UploadJob, UserProfile } from './pages'
import { users } from './utils/data'
import { useSelector } from 'react-redux'
import InActive from './pages/inActive'

const Layout = ()=>{
  // const user = users[0]
  const { user } = useSelector((state) => state.user);
  const location = useLocation()
//  console.log(user)
  return user?.name || user?.firstName ? <Outlet /> : <Navigate to = "user-auth" state = {{from:location}} replace />
  return  <Outlet/>
}

function App() {
// let user = users[0]
const { user } = useSelector((state) => state.user);



  return (
    <>
      <main>
        <Navbar/>
        <Routes>
          <Route element={<Layout/>}
          >
          <Route path="/" element={<Navigate to="/find-jobs" replace={true} />} />
          <Route path = "/find-jobs" 
          element = {<FindJob/>}
          />     
          <Route path="/companies" 
          element = {<Companies/>}
          />   
          <Route
            path={
              user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />
          
          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/applly-history"} element={<h5>This is page is in developement process</h5>}/>
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />              
          </Route>
          
          <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<Auth />} />
        <Route path='/user-inactive' element={<InActive/> } />
        </Routes>
       {user && <Footer/> } 
      </main>
    </>
  )
}

export default App
