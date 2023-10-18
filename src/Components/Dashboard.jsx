import React from 'react'
import DashboardPage from './DashboardComponents/DashboardPage'
import AdminNavbar from './AdminNavbar'

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar/>
        <DashboardPage/>
    </div>
  )
}

export default Dashboard