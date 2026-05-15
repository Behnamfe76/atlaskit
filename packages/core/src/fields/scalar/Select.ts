import { Field } from "../Field";

export class Select extends Field {
  static override fieldType = "select";

  options(values: Record<string, string>): this {
    return this.display({
      options: values
    });
  }
}
