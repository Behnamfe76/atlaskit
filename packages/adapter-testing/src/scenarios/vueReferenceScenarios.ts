import { behaviorScenarios } from "./behaviorScenarios";

export const vueReferenceScenarios = {
  actionExecution: behaviorScenarios.actionExecution,
  asyncDependencies: behaviorScenarios.asyncDependencies,
  futureParity: behaviorScenarios.futureParity,
  relationshipFields: behaviorScenarios.relationshipFields,
  styling: behaviorScenarios.styling
} as const;
