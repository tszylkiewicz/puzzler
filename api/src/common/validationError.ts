export interface ValidationError {
    errorCode: string
    errorMessage: string
    validations: Validation[]
}

export interface Validation {
    property: string
    code: string
}
