import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserById, validateUser } from "../services/authService.js";
import { verifyPassword } from "../utils/hash.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await validateUser(username, password, verifyPassword);
        if (!user) {
          return done(null, false, {
            message: "Invalid credentials",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = getUserById(id);

    if (!user) {
      return done(false, null);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default passport;
