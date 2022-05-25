const express       = require("express");
const morgan        = require("morgan");
const bodyParser    = require("body-parser");
const swaggerJSON   = require("./swagger.json");
const swaggerUI     = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// konfigurasi body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route
const router = require("./routes/index");
app.use(router);
// swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
// set templating engine  ejs
app.set("view engine", "ejs");

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
