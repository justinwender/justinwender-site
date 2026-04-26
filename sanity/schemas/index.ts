import { aboutPage } from "./aboutPage";
import { externalPublication } from "./externalPublication";
import { post } from "./post";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  post,
  project,
  externalPublication,
  aboutPage,
  siteSettings,
];

export const singletonTypes = new Set(["aboutPage", "siteSettings"]);
