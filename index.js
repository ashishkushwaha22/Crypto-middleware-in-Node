const express = require('express');
const bodyParser = require('body-parser');
const { encryptMiddleware } = require("./middlewares/encrypt");
const { decryptMiddleware } = require("./middlewares/decrypt");
const router = require("./routes/index");


const app = express();
app.use(bodyParser.json());

// Middlewares
app.use(encryptMiddleware);
app.use(decryptMiddleware);

app.use("/api", router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
