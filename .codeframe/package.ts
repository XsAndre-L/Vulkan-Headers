import {
  BuildType,
  CPP_OUTPUT_DIR,
  runPackageAction,
  BuildConfiguration,
  LibraryInfo,
} from "../../../../src/providers/package.provider.ts";

import { resolve } from "node:path";
import { argv } from "node:process";
import { FileCollectionBuild } from "../../../../src/core/types/package.types.js";

export const info: LibraryInfo = {
  name: "vulkan",
  outDir: "build",
  version: "0.0.0",
};

export const build = (cwd: string = process.cwd()): BuildType => {
  const INSTALL_DIR = resolve(cwd, "../", CPP_OUTPUT_DIR);

  const VULKAN_INSTALL = resolve(INSTALL_DIR, "vulkan");

  // Shipped Backends

  const vulkan: FileCollectionBuild = {
    type: "collection",
    libs: {
      [VULKAN_INSTALL]: ["include"],
    },
  };

  return vulkan satisfies BuildType;
};

const args = argv.slice(2);
const [action = "help"] = args;

const buildConfig: BuildConfiguration = {
  info,
  build: build(),
};

await runPackageAction(action, process.cwd(), buildConfig);
