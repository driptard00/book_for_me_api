// import important modules
const mongoose = require("mongoose");

// // connecting to mongo db database
// const connector = mongoose.connect(process.env.MONGODB_URL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// module.exports = connector;


module.exports = {
    development: mongoose.connect(process.env.DEV_MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }),

    production: mongoose.connect(process.env.PROD_MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}