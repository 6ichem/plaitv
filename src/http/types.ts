export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export interface createUserPayload {
  email: string;
  password: string;
}

export interface loginUserPayload {
  username: string;
  password: string;
}

export interface forgotPasswordPayload {
  email: string;
}

export interface validateEmailPayload {
  email_token: string;
}
