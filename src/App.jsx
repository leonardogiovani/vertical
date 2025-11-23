import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import Create from './pages/Create'
import Donations from './pages/Donations'
import CreateTest from './pages/CreateTest'
import Inbox from './pages/Inbox'
import Profile from './pages/Profile'

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/create-test" element={<CreateTest />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
