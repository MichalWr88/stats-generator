import { type Route } from "next";

export interface NavLinkData {
  label: string;
  id: number;
  path: Route;
  // icon: IconType;
}
