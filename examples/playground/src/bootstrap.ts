import {
  Atlas,
  Plugin,
  Resource,
  Text,
  type ValidationRegistry
} from "../../../packages/core/src";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";

  override fields() {
    return [Text.make("Name", "name")];
  }
}

class PlaygroundPlugin extends Plugin {
  readonly name = "playground-plugin";
  readonly version = "1.0.0";

  override register(context: { validationRegistry: ValidationRegistry }) {
    context.validationRegistry.registerRule(
      "nonEmpty",
      (value) => String(value ?? "").trim().length > 0
    );
  }
}

export function bootstrapPlayground() {
  Atlas.reset();
  return Atlas.configure({
    plugins: [new PlaygroundPlugin()],
    resources: [ProductResource]
  });
}
