import DropdownContentConfig from '../../../components/dropDownContent/contentRandom';


//icons
/*
  *@List of icons can be found there they need to capitalized for svg use
  *@https://material.io/tools/icons/?style=baseline
  *@instruction what to capitalize
  *@https://www.npmjs.com/package/@material-ui/icons
  *@ icons can be outlined , two-tone , rounded and sharp
*/

//icons
import Accessibility from '@material-ui/icons/Accessibility';
import AlarmOn from '@material-ui/icons/AlarmOn';
import PetsRounded from '@material-ui/icons/PetsRounded';
import CameraEnhanceTwoTone from '@material-ui/icons/CameraEnhanceTwoTone';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import EjectSharp from '@material-ui/icons/EjectSharp';


export const links = [
  {
    name: 'home',
    icon: {name: Accessibility, color: 'secondary'},
    href: '/cost-overview',
    label: 'home',
    type:'link',
    toBePresentOn: [
      'cost-overview',
      'service-statement',
      'analytics',
      'my-reports',
    ],
  },
  {
    name: 'service-statement',
    icon: {name: AlarmOn, color: 'secondary'},
    href: '',
    label: 'service Statement',
    type:'dropdown',
    dropDownContent:DropdownContentConfig,
    toBePresentOn: [
      'cost-overview',
      'service-statement',
      'kpi',
      'analytics',
      'my-reports',
    ],
  },
  {
    name: 'my-reports',
    icon: {name: PetsRounded, color: 'secondary'},
    href: '/#!/cost-overview',
    label: 'my Reports',
    type:'link',
    toBePresentOn: [
      '',
      'service-statement',
      'kpi',
      'analytics',
      'my-reports',
    ],
  },
  {
    name: 'kpi',
    icon: {name: CameraEnhanceTwoTone, color: 'secondary'},
    href: '/#!/cost-overview',
    label: 'kpi',
    type:'dropdown',
    dropDownContent:DropdownContentConfig,
    toBePresentOn: [
      '',
      'service-statement',
      'kpi',
      'analytics',
      'my-reports',
    ],
  },
  
  {
    name: 'analytics',
    icon: {name: CameraEnhanceTwoTone, color: 'secondary'},
    href: '/#!/cost-overview',
    label: 'Cost Overview',
    type:'link',
    toBePresentOn: [
      '',
      'service-statement',
      'kpi',
      'analytics',
      'my-reports',
    ],
  },
  {
    name: 'cost-overview 3',
    icon: {name: FaceOutlined, color: 'secondary'},
    href: '/#!/cost-overview',
    label: 'Cost Overview',
    type:'link',
    toBePresentOn: [
      'cost-overview',
      'service-statement',
      'kpi',
      'analytics',
      'my-reports',
    ],
  },
  {
    name: 'page set',
    icon: {name: EjectSharp, color: 'secondary'},
    href: '/#!/cost-overview',
    label: 'Cost Overview',
    type:'link',
    toBePresentOn: [
      'cost-overview',
      'service-statement',
      'kpi',
      'analytics',
      'my-reports',
    ],
  },
];