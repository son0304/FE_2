import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from '../../layout/Admin';
import Client from '../../layout/Client';
import Dashboard from '../pages/Admin/Dashboard';
import ProductList from '../components/Product/ProductList';
import { ProductAdd } from '../components/Product/ProductAdd';
import ProductDetail from '../components/Product/ProductDetail';
import ProductUpdate from '../components/Product/ProductUpdate';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Client />} />
            
            {/* Admin Layout */}
            <Route path="/admin" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />

                {/* Product Management */}
                <Route path="product" element={<ProductList />}>
                    <Route path="create" element={<ProductAdd />} />
                    <Route path="detail/:id" element={<ProductDetail />} />
                    <Route path="update/:id" element={<ProductUpdate />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
