declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongoDBConnection: string;
      secretSession: string;
      port: string;
    };
  };
};

export { };