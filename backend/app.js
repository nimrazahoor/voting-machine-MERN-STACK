const express = require("express");
const port = 5000;
const app = express();
const session = require("express-session");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("/images"));
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
  })
  );

app.use(
  session({
    secret: "SECRET_KEY",
    resave: false,
    saveUninitialized: true,
  })
  );
  
  app.use(require("./router/approveCandidate"));
  app.use(require("./router/auth"));
  app.use(require("./router/candidates"));
  app.use(require("./router/constituency"));
  app.use(require("./router/calculateResult"))
  app.use(require("./router/election"));
  app.use(require("./router/polling"));
  app.use(require("./router/vote"));
  app.use(require("./router/invite"))
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
