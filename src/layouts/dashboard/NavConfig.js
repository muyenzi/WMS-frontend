// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
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
    path: '/dashboard/schoolsapproved',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'HouseHolds',
    path: '/dashboard/householdsapproved',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
 
  {
    title: 'Health Facilities',
    path: '/dashboard/healthfacilitiesapproved',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
 
  {
    title: 'data collection',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
 
  {
    title: 'Organizations',
    path: '/dashboard/organizations',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: '',
    path: '/404',
    icon: ""
  },
];

 
  

export default navConfig;

