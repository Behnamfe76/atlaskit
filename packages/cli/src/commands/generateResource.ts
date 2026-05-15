import { join } from "node:path";

import { formatResourceTemplate } from "../formatters/resourceTemplate";
import { writeGeneratedFile } from "../io/writeGeneratedFile";

export interface GenerateResourceOptions {
  readonly cwd?: string;
  readonly force?: boolean;
  readonly targetDir?: string;
}

export async function generateResource(
  name: string,
  options: GenerateResourceOptions = {}
): Promise<{ readonly created: boolean; readonly path: string }> {
  const template = formatResourceTemplate(name);
  const cwd = options.cwd ?? process.cwd();
  const targetDirectory = options.targetDir ?? join(cwd, "resources");
  const targetPath = join(targetDirectory, template.fileName);

  return writeGeneratedFile(targetPath, template.contents, {
    force: options.force
  });
}
