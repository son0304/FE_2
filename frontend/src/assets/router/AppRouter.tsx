import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from '../../layout/Admin';
import Client from '../../layout/Client';
import Dashboard from '../pages/Admin/Dashboard';

const AppRouter = () => {
    return (

        <Routes>
            <Route path='/' element={<Client />} />
            {/* Admin */}
            <Route path="/admin" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />

            </Route>
        </Routes>

    );
};

export default AppRouter;
