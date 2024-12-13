const express = require("express");
const User = require("./routers/User");
const app = express();
const cors = require("cors");
const Library = require("./routers/Library");

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello World What are Doing Here Brother")
})

app.use("/user", User);
app.use("/", Library);

app.listen(4000, console.log("Hello World brothoer"));