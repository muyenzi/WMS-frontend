// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



const navConfigUser = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Schools',
    path: '/dashboard/schoolsrejected',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  
  {
    title: 'HouseHolds',
    path: '/dashboard/householdsrejected',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Public Place',
    path: '/dashboard/schools',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Health Facilities',
    path: '/dashboard/organizations',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
 
  
];

export default navConfigUser;

