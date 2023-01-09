export default function catchAsyncErrors(middleware) {
  return async function (req, res, next) {
    try {
      await middleware(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}
