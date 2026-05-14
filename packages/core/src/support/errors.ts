export class AtlasError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class DuplicateRegistrationError extends AtlasError {
  constructor(registry: string, field: string, value: string) {
    super(
      `Duplicate registration in ${registry}: ${field} "${value}" is already registered.`
    );
  }
}

export class MissingServiceError extends AtlasError {
  constructor(tokenDescription: string) {
    super(`No service registered for token "${tokenDescription}".`);
  }
}

export class MissingResourceError extends AtlasError {
  constructor(field: "id" | "uriKey", value: string) {
    super(`No resource registered for ${field} "${value}".`);
  }
}
