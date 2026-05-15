import { Field } from "../Field";

export class BelongsToMany extends Field {
  static override fieldType = "belongsToMany";
}
