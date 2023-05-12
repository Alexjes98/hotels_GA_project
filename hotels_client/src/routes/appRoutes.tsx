import { RouteType } from "./config";

import HomePage from "../pages/home/HomePage";
import ZonesPage from "../pages/zones/ZonesPage";

import MapIcon from '@mui/icons-material/Map';
import ZoneInfoPage from "../pages/zones/ZoneInfoPage";
import RecommendationFormPage from "../pages/recommendation_form/RecommendationFormPage";

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
    path: "/zones",
    element: <ZonesPage />,
    state: "zones",
    sidebarProps: {
      displayText: "Available Zones",
      icon: <MapIcon />
    },
    child: [
      {
        index: true,
        element: <ZoneInfoPage />,
        state: "zones.index"
      },
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
];

export default appRoutes;