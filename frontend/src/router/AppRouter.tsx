import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from '../layout/Admin';
import Client from '../layout/Client';
import Dashboard from '../pages/Admin/Dashboard';
import Login from '../auth/Login';
import HomeUser from '../pages/Admin/User/HomeUser';
import ListUser from '../pages/Admin/User/ListUser';
import CreateUser from '../pages/Admin/User/CreateUser';
import UpdateUser from '../pages/Admin/User/UpdateUser';
import DetailUser from '../pages/Admin/User/DetailUser';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Client />} />

            {/* Admin Layout */}
            <Route path="/admin" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />

                {/* User Management */}
                <Route path="user" element={<HomeUser />}>
                    <Route index element={<ListUser />} />
                    <Route path="create" element={<CreateUser />} />
                    <Route path="detail/:id" element={< DetailUser />} />
                    <Route path="update/:id" element={<UpdateUser />} />
                </Route>

                
            </Route>
        </Routes>
    );
};

export default AppRouter;
