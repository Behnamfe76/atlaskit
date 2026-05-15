import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname } from "node:path";

export interface WriteGeneratedFileOptions {
  readonly force?: boolean;
}

export async function writeGeneratedFile(
  filePath: string,
  contents: string,
  options: WriteGeneratedFileOptions = {}
): Promise<{ readonly created: boolean; readonly path: string }> {
  await mkdir(dirname(filePath), {
    recursive: true
  });

  try {
    await access(filePath, constants.F_OK);
    if (!options.force) {
      throw new Error(`File already exists at ${filePath}.`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      if (!options.force) {
        throw error;
      }
    }
  }

  await writeFile(filePath, contents, "utf8");

  return {
    created: true,
    path: filePath
  };
}
