const app = require("./app");
if (process.env.NODE_ENV === "production") {
  port = 8000;
} else {
  port = 8001;
}
app.listen(port, () => {
  console.log(`listining to port ${port}`);
});
