import indexNav from '../../views/clientes/navigation/indexNav';
import categoryNav from '@/views/category/navigation/index'
export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Second Page',
    route: 'second-page',
    icon: 'FileIcon',
  },
  indexNav,
  categoryNav
]
