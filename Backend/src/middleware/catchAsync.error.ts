export const catchAsync = (fn: any) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => next(err));
  };
};
