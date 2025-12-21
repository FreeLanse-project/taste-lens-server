export interface EnvVariables {
  ENV: string;

  URL: string;
  PORT: number;

  API_KEY: string;
  JWT_SECRET: string;
  OPEN_AI_KEY: string;

  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;

  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_AUTH_USER: string;
  MAIL_AUTH_PWD: string;
  MAIL_FROM: string;
}
