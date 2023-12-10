require("module-alias/register");
require("dotenv").config();
const express = require("express");
const userRoutes = require("@src/routes/userRoutes");
const postsRoutes = require("@src/routes/postsRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
