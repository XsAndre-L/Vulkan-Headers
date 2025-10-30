import {
  BuildType,
  HeaderList,
  OUTPUT_DIR,
} from "../../../../src/types/package-config.ts";
import { runPackageAction } from "../../../../src/commands/packages.ts";

import { resolve } from "node:path";
import { argv } from "node:process";

export const build = (cwd: string = process.cwd()): BuildType => {
  const INSTALL_DIR = resolve(cwd, "../", OUTPUT_DIR);

  const VULKAN_INSTALL = resolve(INSTALL_DIR, "vulkan");

  // Shipped Backends

  const vulkan: HeaderList = {
    type: "headers",
    libs: {
      [VULKAN_INSTALL]: ["include"],
    },
  };

  return vulkan satisfies BuildType;
};

const args = argv.slice(2);
const [action = "help"] = args;

await runPackageAction(action, process.cwd(), build());
