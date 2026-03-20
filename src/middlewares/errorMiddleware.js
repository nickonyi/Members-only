const sendErrorDev = (err, res) => {
  console.error("Error", err);

  return res.status(err.statusCode || 500).render("error", {
    title: "Something went wrong!",
    code: err.statusCode || 500,
    message: err.message || "Please try again later",
    url: err.url || null,
    stack: [],
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      code: err.statusCode || 500,
      message: err.message || "Please try again later",
      url: err.url || null,
    });
  }

  console.error("Unexpected error", err);

  res.status(500).render("error", {
    title: "Something went wrong!",
    code: 500,
    message: "Please try again later.",
    url: null,
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= "error";

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};
