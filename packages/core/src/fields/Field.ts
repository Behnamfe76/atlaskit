import type { PlainObject } from "../support/types";
import { parseRules } from "../validation/ruleParser";
import type { RuleInput } from "../validation/ruleTypes";

import type {
  FieldDefinition,
  FieldDependency,
  FieldPage,
  FieldVisibility
} from "./fieldTypes";

function createDefaultVisibility(): FieldVisibility {
  return {
    create: true,
    detail: true,
    edit: true,
    index: true
  };
}

export class Field implements FieldDefinition {
  static fieldType = "field";

  static make<TField extends typeof Field>(
    this: TField,
    label: string,
    attribute = label.trim().toLowerCase().replace(/\s+/g, "_")
  ): InstanceType<TField> {
    return new this(label, attribute) as InstanceType<TField>;
  }

  readonly type: string;
  sortable = false;
  searchable = false;
  filterable = false;
  rules = [] as FieldDefinition["rules"];
  visibility = createDefaultVisibility();
  dependencies = [] as FieldDependency<this>[];
  displayMeta: PlainObject = {};
  serializationMeta: PlainObject = {};
  defaultValue?: unknown;
  placeholder?: string;
  helpText?: string;

  constructor(
    readonly label: string,
    readonly attribute: string
  ) {
    this.type = (this.constructor as typeof Field).fieldType;
  }

  clone(): this {
    const cloned = Object.assign(
      Object.create(Object.getPrototypeOf(this)) as this,
      this
    );
    cloned.visibility = { ...this.visibility };
    cloned.dependencies = [...this.dependencies] as FieldDependency<this>[];
    cloned.displayMeta = { ...this.displayMeta };
    cloned.serializationMeta = { ...this.serializationMeta };
    cloned.rules = [...this.rules];
    return cloned;
  }

  default(value: unknown): this {
    this.defaultValue = value;
    return this;
  }

  dependsOn(
    attribute: string,
    callback: FieldDependency<this>["callback"]
  ): this {
    this.dependencies = [...this.dependencies, { attribute, callback }];
    return this;
  }

  display(meta: PlainObject): this {
    this.displayMeta = {
      ...this.displayMeta,
      ...meta
    };
    return this;
  }

  filterableField(): this {
    this.filterable = true;
    return this;
  }

  help(text: string): this {
    this.helpText = text;
    return this;
  }

  hideFrom(page: FieldPage): this {
    this.visibility = {
      ...this.visibility,
      [page]: false
    };
    return this;
  }

  hideOnCreate(): this {
    return this.hideFrom("create");
  }

  hideOnDetail(): this {
    return this.hideFrom("detail");
  }

  hideOnEdit(): this {
    return this.hideFrom("edit");
  }

  hideOnIndex(): this {
    return this.hideFrom("index");
  }

  isVisibleOn(page: FieldPage): boolean {
    return this.visibility[page];
  }

  placeholderText(text: string): this {
    this.placeholder = text;
    return this;
  }

  rulesFor(ruleInput: readonly RuleInput[] | RuleInput): this {
    this.rules = parseRules(ruleInput);
    return this;
  }

  searchableField(): this {
    this.searchable = true;
    return this;
  }

  serialize(meta: PlainObject): this {
    this.serializationMeta = {
      ...this.serializationMeta,
      ...meta
    };
    return this;
  }

  showOnCreate(): this {
    this.visibility = {
      ...this.visibility,
      create: true
    };
    return this;
  }

  showOnDetail(): this {
    this.visibility = {
      ...this.visibility,
      detail: true
    };
    return this;
  }

  showOnEdit(): this {
    this.visibility = {
      ...this.visibility,
      edit: true
    };
    return this;
  }

  showOnIndex(): this {
    this.visibility = {
      ...this.visibility,
      index: true
    };
    return this;
  }

  sortableField(): this {
    this.sortable = true;
    return this;
  }
}
