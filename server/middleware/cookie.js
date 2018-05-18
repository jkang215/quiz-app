const cookieManager = (req, res, next) => {
  console.log("inside manager");
  console.log("Cookies: ", req.cookies);
  res.cookie = { userID: "somerandomidentifier" };
  next();
};

module.exports = cookieManager;
