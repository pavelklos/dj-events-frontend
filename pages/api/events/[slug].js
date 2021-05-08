const { events } = require("./data.json");

export default (req, res) => {
  const { slug } = req.query;
  const singleEvent = events.filter((event) => event.slug === slug);

  // check method 'GET'
  if (req.method === "GET") {
    res.status(200).json(singleEvent);
  } else {
    // 405 : Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
