/* Layout Payload — /admin
 * Ce layout est séparé du layout public pour éviter le custom cursor,
 * sticky bar et polices éditoriales dans l'admin CMS.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { ServerFunctionClient } from "payload";
import config from "@/payload.config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import "@payloadcms/next/css";
import { importMap } from "./importMap.js";

import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
