// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



const navConfigAdmin = [
  {
    title: 'dashboard ',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  
  {
    title: 'users',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Schools',
    path: '/dashboard/schools',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
 
  {
    title: 'House Holds',
    path: '/dashboard/households',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Organizations',
    path: '/dashboard/organizations',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
 
  
];

export default navConfigAdmin;

