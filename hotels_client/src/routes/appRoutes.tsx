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
    roles: ["Admin", "User"],
    state: "home"
  },
  {
    path: "/recommendation/:zoneId",
    element: <RecommendationFormPage />,
    roles: ["Admin", "User"],
    state: "recommendation",
  },
  {
    path: "/admin_dashboard/",
    element: <AdminDashboard />,
    state: "dashboard",
    roles: ["Admin"]
  },
  {
    path: "/zones_link",
    element: <ZonesPage destiny="recommendation" />,
    roles: ["Admin", "User"],
    state: "zones",
    sidebarProps: {
      displayText: "Hotel Recommendation",
      icon: <MapIcon />
    },
  },
  {
    path: "/admin_hotels",
    element: <ZonesPage destiny="selected_zone" />,
    roles: ["Admin"],
    state: "admin_zones",
    sidebarProps: {
      displayText: "Admin Hotels",
      icon: <BedIcon />
    },
  },
  {
    path: "/admin_zones",
    element: <AdminZonesPage />,
    roles: ["Admin"],
    state: "admin_zones",
    sidebarProps: {
      displayText: "Admin Available Zones",
      icon: <ApartmentIcon />
    },
  },
  {
    path: "/selected_zone/:zoneId",
    element: <ZoneInfoPage />,
    roles: ["Admin"],
    state: "selected_zone"
  }
];

export default appRoutes;