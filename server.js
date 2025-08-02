const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler"); // <-- Import error handler

// Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); // Make sure this path is correct

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Passport config
require("./config/passport");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
