import type { ClassMap } from "@atlaskit/adapter-contracts";

export interface VueClassMap extends ClassMap {
  readonly actionRunner?: ClassMap;
  readonly fieldRenderer?: ClassMap;
  readonly resourceForm?: ClassMap;
  readonly resourceShow?: ClassMap;
  readonly resourceTable?: ClassMap;
}
