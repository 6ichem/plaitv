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

export interface resetTokenPayload {
  password_reset_token: string;
}

export interface resetPasswordPayload extends resetTokenPayload {
  new_password: string;
}

export interface getRefreshTokenPayload {
  access_token: string;
}

export interface issueAccessTokenPayload {
  refresh_token: string;
}

export interface getPlaylistMediaPayload {
  playlist_id: string;
}

export interface newPlaylistPayload {
  title: string;
  description: string;
}

export interface editPlaylistPayload extends newPlaylistPayload {
  playlist_id: string;
}

export interface lambdaMediaPayload {
  url?: string;
  request_id?: string;
}

export interface mediaControllerPayload {
  media_id: string;
}
