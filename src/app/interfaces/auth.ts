import { JwtPayload } from "jwt-decode";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface AccessToken {
  access_token: string;
  token_type: string;
}

export interface DecodedToken extends JwtPayload {
  session_id: string;
  sub: string;
  role: string;
  token_type: string;
  exp: number;
}
