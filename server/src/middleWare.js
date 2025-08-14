const { isAdmin } = require("./helpers");

export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ error: "Authentication required" });
    res.redirect("/login");
  }
}

export function adminAuth(req, res, next) {
  if (!isAdmin(req.user)) {
    return res.status(401).json({ message: "Not Authorised" });
  } else {
    next();
  }
}
