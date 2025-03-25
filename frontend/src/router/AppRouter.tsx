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
import HomeClient from '../pages/Client/HomeClient'; // Import HomeClient
import ProductCilent from '../pages/Client/ProductCilent';

const AppRouter = () => {
    return (
        <Routes>
            {/* Route login riêng */}
            <Route path='/login' element={<Login />} />

            {/* Client Layout */}
            <Route path="/" element={<Client />}>
                <Route index element={<HomeClient />} />  
                <Route path='product' element={<ProductCilent />} />  
            </Route>

            {/* Admin Layout */}
            <Route path="/admin" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />

                {/* User Management */}
                <Route path="user" element={<HomeUser />}>
                    <Route index element={<ListUser />} />
                    <Route path="create" element={<CreateUser />} />
                    <Route path="detail/:id" element={<DetailUser />} />
                    <Route path="update/:id" element={<UpdateUser />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
