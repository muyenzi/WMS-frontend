import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import School from './pages/School';
import Organization from './pages/Organization';
import ListRejectedSchools from './pages/ListRejectedSchools';
import ListRejectedHouseHolds from './pages/ListRejectedHouseHold';
import ListApprovedSchools from './pages/ListApprovedSchools';
import ListApprovedHouseHold from './pages/ListApprovedHouseHold';
import HouseHolds from "./pages/HouseHolds";
import HealthFacility from "./pages/HealthFacility";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'schools', element: <School /> },
        { path: 'households', element: <HouseHolds /> },
        { path: 'householdsapproved', element: <ListApprovedHouseHold /> },
        { path: 'organizations', element: <Organization /> },
        { path: 'products', element: <Products /> },
        { path: 'schoolsrejected', element: <ListRejectedSchools /> },
        { path: 'householdsrejected', element: <ListRejectedHouseHolds /> },
        { path: 'healthfacilities',element: <HealthFacility />}, 
        { path: 'schoolsapproved', element: <ListApprovedSchools /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
