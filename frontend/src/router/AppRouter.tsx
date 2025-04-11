import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from '../layout/Admin';
import Client from '../layout/Client';
import Dashboard from '../pages/Admin/Dashboard';
import Login from '../auth/Login';
import HomeUser from '../pages/Admin/User/HomeUser';
import ListUser from '../pages/Admin/User/ListUser';
// import CreateUser from '../pages/Admin/User/CreateUser';
// import UpdateUser from '../pages/Admin/User/UpdateUser';
// import DetailUser from '../pages/Admin/User/DetailUser';
import HomeClient from '../pages/Client/HomeClient'; // Import HomeClient
import HomeProduct from '../pages/Admin/Product/HomeProduct';
import ListProduct from '../pages/Admin/Product/ListProduct';
import CreateProduct from '../pages/Admin/Product/CreateProduct';
import DetailProduct from '../pages/Admin/Product/DetailProduct';
import UpdateProduct from '../pages/Admin/Product/UpdateProduct';
import ProductClient from '../pages/Client/ProductClient';
import OrderClient from '../pages/Client/Order/OrderClient';
import CreateUser from '../pages/Admin/User/CreateUser';
import DetailUser from '../pages/Admin/User/DetailUser';
import UpdateUser from '../pages/Admin/User/UpdateUser';
import HomeOrder from '../pages/Admin/Order/HomeOrder';
import OrderList from '../pages/Admin/Order/OrderList';
import CartDetail from '../pages/Client/CartDetail';
import OrderDetail from '../pages/Client/Order/OrderDetail';
import ListOrder from '../pages/Client/Order/ListOrder';


const AppRouter = () => {
    return (
        <Routes>
            {/* Route login riêng */}
            <Route path='/login' element={<Login />} />

            {/* Client Layout */}
            <Route path="/" element={<Client />}>
                <Route index element={<HomeClient />} />
                <Route path='product' element={<ProductClient />} />
                <Route path='cart' element={<CartDetail />} />
                <Route path="order" element={<OrderClient />} />
                <Route path='listOrder' element={<ListOrder/>}/>
                <Route path="order/detail/:id" element={<OrderDetail />} />
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

                {/* Product */}
                <Route path="products" element={<HomeProduct />}>
                    <Route index element={<ListProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route path="detail/:id" element={<DetailProduct />} />
                    <Route path="update/:id" element={<UpdateProduct />} />
                </Route>

                {/* {Order} */}
                <Route path="order" element={<HomeOrder />}>
                    <Route index element={<OrderList />} />

                </Route>

            </Route>
        </Routes>
    );
};

export default AppRouter;