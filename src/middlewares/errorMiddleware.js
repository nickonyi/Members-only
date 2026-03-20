const sendErrorDev = (err, res) => {
  console.error("Error", err);

  res.status(err.statusCode || 500).render("error", {
    title: "Something went wrong!",
    code: err.statusCode || 500,
    message: err.message || "Please try again later",
    url: url || null,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      code: err.statusCode || 500,
      message: err.message || "Please try again later",
      url: url || null,
    });
  }
};
