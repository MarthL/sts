declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_TYPE: any;
      REACT_APP_HOST: string;
      REACT_APP_PORT: string;
      REACT_APP_USER: string;
      REACT_APP_DBNAME: string;
    }
  }