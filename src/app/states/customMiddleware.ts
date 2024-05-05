export const customMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const response = action?.payload || {};
    const {responseCode, message} = response as {
      responseCode: any;
      message: string;
    };
    return next(action);
  };
