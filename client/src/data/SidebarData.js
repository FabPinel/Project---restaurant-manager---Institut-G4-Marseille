/* eslint-disable no-unused-vars */
import * as FaIcons from "react-icons/md";

const SidebarData = [
  { id: 1, title: 'Dashboard', path: '/', icon: <FaIcons.MdOutlineInsertChart size={32}/>},
  { id: 2, title: 'Salle', path: '/Salle', icon: <FaIcons.MdMeetingRoom size={32}/>},
  { id: 3, title: 'Réservation', path: '/Reservation', icon: <FaIcons.MdOutlineContactPhone size={32}/>},
  { id: 4, title: 'Gestion des stocks', path: '/Stock', icon: <FaIcons.MdOutlineEventNote size={32}/>},
  { id: 5, title: 'Menus', path: '/Menu', icon: <FaIcons.MdRestaurantMenu size={32}/>},
  { id: 6, title: 'Plats', path: '/Plat', icon: <FaIcons.MdOutlineRoomService size={32}/>},
  { id: 7, title: 'Planning', path: '/Planning', icon: <FaIcons.MdCalendarToday size={32}/>},
  { id: 8, title: 'Fournisseur', path: '/Fournisseur', icon: <FaIcons.MdLocalShipping size={32}/>},
]

export default SidebarData;