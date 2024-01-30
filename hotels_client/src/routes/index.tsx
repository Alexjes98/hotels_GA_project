import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appRoutes from "./appRoutes";
import { RouteType } from "./config";
import UnauthorizedPage from "../pages/general/UnauthorizedPage";

const generateRoute = (routes: RouteType[]): ReactNode => {
  
  const isUserAllowed = (routeRoles: any) => {
    
    const currentUserRoles = ["Admin"]; 
    return routeRoles.some((role: any) => currentUserRoles.includes(role));
  };

  return routes.map((route, index) => {
    const allowed = isUserAllowed(route.roles ?? []);
    if(!allowed) return <Route path="*" element={<UnauthorizedPage/>} key={index}/>;
    return route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <PageWrapper state={route.state ?? undefined}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )
    });
};

export const routes: ReactNode = generateRoute(appRoutes);