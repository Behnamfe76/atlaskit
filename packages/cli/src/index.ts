import { generateResource } from "./commands/generateResource";

async function main(argv: readonly string[]): Promise<void> {
  const [command, subject, name, ...rest] = argv;

  if (command === "generate" && subject === "resource" && name) {
    const result = await generateResource(name, {
      force: rest.includes("--force")
    });
    process.stdout.write(`Generated resource: ${result.path}\n`);
    return;
  }

  process.stdout.write("Usage: atlaskit generate resource <name> [--force]\n");
}

if (process.argv[1]?.endsWith("index.js")) {
  void main(process.argv.slice(2));
}

export * from "./commands/generateResource";
export * from "./formatters/resourceTemplate";
export * from "./io/writeGeneratedFile";
export * from "./stubs/resource";
