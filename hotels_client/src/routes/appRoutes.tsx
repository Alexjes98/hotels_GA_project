import { RouteType } from "./config";

import HomePage from "../pages/home/HomePage";
import ZonesPage from "../pages/zones/ZonesPage";

import MapIcon from '@mui/icons-material/Map';
import ZoneInfoPage from "../pages/zones/ZoneInfoPage";
import RecommendationFormPage from "../pages/recommendation_form/RecommendationFormPage";
import AdminDashboard from "../pages/admin_views/AdminDashboardPage";

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
    path: "/zones",
    element: <ZonesPage destiny="recommendation" />,
    state: "zones",
    sidebarProps: {
      displayText: "Available Zones",
      icon: <MapIcon />
    },
    child: [
      {
        path: "/zones/:zoneId",
        element: <ZoneInfoPage />,
        state: "zones.default",
        sidebarProps: {
          displayText: "Default"
        },
      },
    ]
  },
  {
    path: "/admin_zones",
    element: <ZonesPage destiny="selected_zone" />,
    state: "admin_zones",
    sidebarProps: {
      displayText: "Available Zones",
      icon: <MapIcon />
    },
  },
  {
    path: "/selected_zone/:zoneId",
    element: <ZoneInfoPage />,
    state: "selected_zone"
  }
];

export default appRoutes;