export const behaviorScenarios = {
  actionExecution: ["active", "disabled", "bulk-selection", "result-state"],
  asyncDependencies: ["hidden-until-ready", "visible-after-update"],
  authorization: ["hidden", "disabled", "active"],
  formMode: ["create", "edit"],
  resourceResolution: ["uriKey", "class", "instance"],
  futureParity: ["components", "composables", "contract-docs"],
  relationshipFields: ["belongsTo", "belongsToMany"],
  styling: ["default-classes", "class-map-overrides", "theme-token-overrides"],
  tableState: ["controlled", "uncontrolled"]
} as const;
