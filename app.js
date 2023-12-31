require("module-alias/register");
require("dotenv").config();
const express = require("express");
const userRoutes = require("@src/routes/userRoutes");
const postsRoutes = require("@src/routes/postsRoutes");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT ?? 8000;


const options = {
    definition : {
        openapi : '3.0.0',
        info: {
            title: 'Express JS documentation',
            version: '1.0.0',
        },
        servers : [
            {
                api: 'http://localhost:8000/'
            }
        ]
    },
    apis : ['./src/routes/*.js']
}
app.use(cors());
app.use(express.json());
const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
