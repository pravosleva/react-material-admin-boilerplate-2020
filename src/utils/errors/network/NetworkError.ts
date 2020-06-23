import { UniversalError } from '@/utils/errors'

export class NetworkError extends UniversalError {
  constructor(message?: string) {
    super('NetworkError')
    this.message = message

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NetworkError.prototype)
  }

  getErrorMsg(): string {
    return `${this.getReadableCamelCase(this.name)}${!!this.message ? `: ${this.message}` : ''}`
  }
}
