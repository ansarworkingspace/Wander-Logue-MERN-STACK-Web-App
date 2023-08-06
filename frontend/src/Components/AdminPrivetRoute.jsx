import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


import React from 'react'

function AdminPrivateRoute() {
const { adminInfo } = useSelector((state) => state.adminAuth);
return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default AdminPrivateRoute