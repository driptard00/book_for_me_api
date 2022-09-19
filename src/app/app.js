// import important modules
const { app, server, express } = require("./server");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const router = require("../routes");

// DB connection
const env = process.env.NODE_ENV || "development";
require("../config/db_config.js")[env];


//  parse JSON-encoded bodies and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// To avoid CORS ERROR, we need allow some Header accesses as done below
app.use(cors());


//  Using Middleware Morgan for logging.
app.use(morgan("combined"));


//Create a default root route,
app.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "code": 200,
        "message": "You are welcome to Book for me API !!!!!!!!"
    })
})


//  Requesting for imported Routes
app.use("/api/v1", router);

// Setting up listener
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "192.168.43.239";
const BASE_URL = process.env.BASE_URL || "http://192.168.43.239:4000";

server.listen(
    PORT,
    function() {
        console.log(`You are now running on PORT:::${PORT}\nPlease visit ${BASE_URL}`) 
    }
)
