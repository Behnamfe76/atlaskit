import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { generateResource } from "../src/commands/generateResource";

describe("generate resource", () => {
  it("creates a typed resource stub and reports the output path", async () => {
    const directory = mkdtempSync(join(tmpdir(), "atlaskit-cli-"));
    const result = await generateResource("Product", {
      cwd: directory
    });

    const contents = readFileSync(result.path, "utf8");

    expect(result.created).toBe(true);
    expect(contents).toContain("export class ProductResource extends Resource");
    expect(contents).toContain('Text.make("Name", "name")');
  });
});
