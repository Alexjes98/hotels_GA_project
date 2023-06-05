import { RouteType } from "./config";

import HomePage from "../pages/home/HomePage";
import ZonesPage from "../pages/zones/ZonesPage";

import MapIcon from '@mui/icons-material/Map';
import BedIcon from '@mui/icons-material/Bed';
import ApartmentIcon from '@mui/icons-material/Apartment';

import ZoneInfoPage from "../pages/admin_views/ZoneInfoPage";
import RecommendationFormPage from "../pages/recommendation_form/RecommendationFormPage";
import AdminDashboard from "../pages/admin_views/AdminDashboardPage";
import AdminZonesPage from "../pages/admin_views/AdminZonesPage";

const appRoutes: RouteType[] = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/recommendation/:zoneId",
    element: <RecommendationFormPage />,
    state: "recommendation",
  },
  {
    path: "/admin_dashboard/",
    element: <AdminDashboard />,
    state: "dashboard",
  },
  {
    path: "/zones_link",
    element: <ZonesPage destiny="recommendation" />,
    state: "zones",
    sidebarProps: {
      displayText: "Available Zones",
      icon: <MapIcon />
    },
  },
  {
    path: "/admin_hotels",
    element: <ZonesPage destiny="selected_zone" />,
    state: "admin_zones",
    sidebarProps: {
      displayText: "Admin Hotels",
      icon: <BedIcon />
    },
  },
  {
    path: "/admin_zones",
    element: <AdminZonesPage />,
    state: "admin_zones",
    sidebarProps: {
      displayText: "Admin Available Zones",
      icon: <ApartmentIcon />
    },
  },
  {
    path: "/selected_zone/:zoneId",
    element: <ZoneInfoPage />,
    state: "selected_zone"
  }
];

export default appRoutes;