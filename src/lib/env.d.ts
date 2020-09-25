declare namespace NodeJS {
  export interface ProcessEnv {
    COOKIE_SECRET: string;
    TYPEORM_URL: string;
    POSTGRES_PASSWORD: string;
  }
}
