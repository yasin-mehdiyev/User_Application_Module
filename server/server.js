const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

// Routes
app.use("/api/user", usersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: http://localhost:${process.env.PORT}`);
});