const PORT = process.env.PORT || 4000;

const server = require("./server.js");

server.get("/", (req, res) => {
  res.status(200).json({ message: "The Server is running!" });
});

server.listen(PORT, () => {
  console.log(`Server is Listening on Port: ${PORT}`);
});
