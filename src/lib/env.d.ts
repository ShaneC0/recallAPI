declare namespace NodeJS {
  export interface ProcessEnv {
    COOKIE_SECRET: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    PORT: string;
  }
}
