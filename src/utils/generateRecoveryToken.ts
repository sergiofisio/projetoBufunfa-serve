const jwt = require("jsonwebtoken");

export default function generateResetToken(email: string): string {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}
