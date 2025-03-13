import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from '../../layout/Admin';
import Client from '../../layout/Client';
import Dashboard from '../pages/Admin/Dashboard';
import ListProduct from '../../components/Products/ListProduct';
import CreateProduct from '../../components/Products/CreateProduct';
import DetailProduct from '../../components/Products/DetailProduct';
import UpdateProduct from '../../components/Products/UpdateProduct';
import HomeProduct from '../../components/Products/HomeProduct';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Client />} />

            {/* Admin Layout */}
            <Route path="/admin" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />

                {/* Product Management */}
                <Route path="product" element={<HomeProduct />}>
                    <Route index element={<ListProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route path="detail/:id" element={<DetailProduct />} />
                    <Route path="update/:id" element={<UpdateProduct />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
