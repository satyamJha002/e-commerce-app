import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Shorter Access Token
  });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SCRET, {
    expiresIn: "30d",
  });
};
