export interface LifecycleHooks {
  readonly afterCreate?: () => void;
  readonly afterDelete?: () => void;
  readonly afterUpdate?: () => void;
  readonly beforeCreate?: () => void;
  readonly beforeDelete?: () => void;
  readonly beforeUpdate?: () => void;
}
