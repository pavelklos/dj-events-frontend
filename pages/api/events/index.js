const { events } = require("./data.json");

export default (req, res) => {
  // check method 'GET'
  if (req.method === "GET") {
    res.status(200).json(events);
  } else {
    // 405 : Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
