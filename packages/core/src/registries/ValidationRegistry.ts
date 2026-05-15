import { BaseRegistry } from "./BaseRegistry";

import { builtinValidators } from "../validation/builtin";
import type { Validator } from "../validation/ruleTypes";

export class ValidationRegistry extends BaseRegistry<string, Validator> {
  constructor() {
    super("ValidationRegistry");

    for (const [name, validator] of Object.entries(builtinValidators)) {
      this.registerRule(name, validator);
    }
  }

  registerRule(name: string, validator: Validator): this {
    this.registerEntry(name, validator);
    return this;
  }
}
