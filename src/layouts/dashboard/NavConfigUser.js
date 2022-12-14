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
    path: '/dashboard/publicplacerejected',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Health Facilities',
    path: '/dashboard/healthfacilitiesrejected',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  
  {
    title: '',
    path: '/404',
    icon: '',
  },
 
  
];

export default navConfigUser;

