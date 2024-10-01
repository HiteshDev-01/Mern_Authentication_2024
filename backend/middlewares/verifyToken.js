import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token is undefined",
      });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // If the token is invalid or userId is missing
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token is invalid",
      });
    }

    // Assign userId from the decoded token to the request object
    req.userId = decodedToken.userId;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error - Token verification failed",
    });
  }
};
