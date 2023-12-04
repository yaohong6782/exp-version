require("module-alias/register")
const express = require("express");
const userRoutes = require("@src/routes/userRoutes")
const postsRoutes = require("@src/routes/postsRoutes")

// import { addAlias } from "module-alias";


const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());


app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
