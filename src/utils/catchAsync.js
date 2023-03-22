// To catch async errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res).catch((e) => next(e));
  };
};

module.exports = catchAsync;
