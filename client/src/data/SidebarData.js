/* eslint-disable no-unused-vars */
import * as FaIcons from "react-icons/md";

const SidebarData = [
  { title: 'Dashboard', path: '/', icon: <FaIcons.MdOutlineInsertChart size={32}/>, current: true },
  { title: 'Salle', path: '/Salle', icon: <FaIcons.MdMeetingRoom size={32}/>, current: false },
  { title: 'Réservation', path: '/Reservation', icon: <FaIcons.MdOutlineContactPhone size={32}/>, current: false },
  { title: 'Gestion des stocks', path: '/Stock', icon: <FaIcons.MdOutlineEventNote size={32}/>, current: false },
  { title: 'Menus', path: '/Menu', icon: <FaIcons.MdRestaurantMenu size={32}/>, current: false },
  { title: 'Plats', path: '/Plat', icon: <FaIcons.MdOutlineRoomService size={32}/>, current: false },
  { title: 'Planning', path: '/Planning', icon: <FaIcons.MdCalendarToday size={32}/>, current: false },
  { title: 'Fournisseur', path: '/Fournisseur', icon: <FaIcons.MdLocalShipping size={32}/>, current: false },
]

export default SidebarData;