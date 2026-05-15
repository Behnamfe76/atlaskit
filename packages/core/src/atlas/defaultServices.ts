import { AuthorizationManager } from "../authorization/AuthorizationManager";
import { QueryClient } from "../cache/QueryClient";
import { EventBus } from "../events/EventBus";
import {
  BelongsTo,
  BelongsToMany,
  Currency,
  DateField,
  FieldWrapper,
  FileField,
  Heading,
  ID,
  Image,
  KeyValue,
  MultiSelect,
  NumberField,
  Repeater,
  Select,
  Text,
  Textarea,
  Video
} from "../fields";
import { I18n } from "../i18n/I18n";
import { arLocale } from "../i18n/locales/ar";
import { enLocale } from "../i18n/locales/en";
import { faLocale } from "../i18n/locales/fa";
import { FieldRegistry } from "../registries/FieldRegistry";
import { LocaleRegistry } from "../registries/LocaleRegistry";
import { PluginRegistry } from "../registries/PluginRegistry";
import { ValidationRegistry } from "../registries/ValidationRegistry";

function fieldDefinition(FieldClass: {
  fieldType: string;
  make(label: string, attribute?: string): unknown;
  name: string;
}) {
  return {
    capabilities: {
      allowsDependencies: true,
      allowsOptions: true,
      allowsValidation: true
    },
    className: FieldClass.name,
    factory: FieldClass,
    key: FieldClass.fieldType,
    pluginSource: "builtin" as const
  };
}

export interface DefaultServices {
  readonly authorizationManager: AuthorizationManager;
  readonly eventBus: EventBus;
  readonly fieldRegistry: FieldRegistry;
  readonly i18n: I18n;
  readonly localeRegistry: LocaleRegistry;
  readonly pluginRegistry: PluginRegistry;
  readonly queryClient: QueryClient;
  readonly validationRegistry: ValidationRegistry;
}

export function createDefaultServices(): DefaultServices {
  const fieldRegistry = new FieldRegistry();
  const validationRegistry = new ValidationRegistry();
  const localeRegistry = new LocaleRegistry();
  const eventBus = new EventBus();
  const queryClient = new QueryClient();
  const authorizationManager = new AuthorizationManager({
    enabled: false
  });

  for (const definition of [
    fieldDefinition(ID),
    fieldDefinition(Text),
    fieldDefinition(Textarea),
    fieldDefinition(NumberField),
    fieldDefinition(Currency),
    fieldDefinition(DateField),
    fieldDefinition(Select),
    fieldDefinition(MultiSelect),
    fieldDefinition(BelongsTo),
    fieldDefinition(BelongsToMany),
    fieldDefinition(Image),
    fieldDefinition(FileField),
    fieldDefinition(Video),
    fieldDefinition(KeyValue),
    fieldDefinition(Repeater),
    fieldDefinition(Heading),
    fieldDefinition(FieldWrapper)
  ]) {
    fieldRegistry.register(definition);
  }

  localeRegistry.register(enLocale).register(faLocale).register(arLocale);

  return {
    authorizationManager,
    eventBus,
    fieldRegistry,
    i18n: new I18n(localeRegistry, {
      fallbackLocale: "en",
      locale: "en"
    }),
    localeRegistry,
    pluginRegistry: new PluginRegistry(),
    queryClient,
    validationRegistry
  };
}
