import { ReactNode } from "react";

export type RouteType = {
    element: ReactNode,
    state: string,
    index?: boolean,
    path?: string,
    child?: RouteType[],
    roles?: string[],
    sidebarProps?: {
        displayText: string,
        icon?: ReactNode,
    }
};