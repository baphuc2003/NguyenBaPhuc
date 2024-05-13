type ErrosType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

export class ErrorWithStatus {
  status: number
  message: string

  constructor({ status, message }: { status: number; message: string }) {
    this.status = status
    this.message = message
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrosType
  constructor({ message = 'Validation error', errors }: { message?: string; errors: ErrosType }) {
    super({ message, status: 422 })
    this.errors = errors
  }
}
