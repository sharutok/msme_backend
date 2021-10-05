const app = require("./app");
const port = 8080 || 8000;
app.listen(port, () => {
  console.log(`listining to port ${port}`);
});
