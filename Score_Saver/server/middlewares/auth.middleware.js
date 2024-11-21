import jwt from "jsonwebtoken";

export const protectUserRoute = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.json({ success: false, message: "you have to login",token });

  const data = jwt.verify(token, process.env.JWT_SECRET);
  req.user = data;
  next();
};

export const protectAdminRoute = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.json({ success: false, message: "you are not authorised" });

  next();
};
