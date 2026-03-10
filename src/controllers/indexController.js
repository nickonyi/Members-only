export const showHomePage = async (req, res, next) => {
  res.render("index", {
    title: "Welcome to CircleAccess",
  });
};
