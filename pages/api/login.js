import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method !== "POST") {
    // [405] Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } else {
    const { identifier, password } = req.body;
    // console.log(req.body);
    // res.status(200).json({ identifier, password });
    // [STRAPI]
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
    const strapiData = await strapiRes.json();
    if (strapiRes.ok) {
      // @todo - Set cookie
      // console.log(strapiData.jwt);
      // [200] OK
      res.status(200).json({ user: strapiData.user });
    } else {
      // ERROR
      res
        .status(strapiData.statusCode)
        .json({ message: strapiData.message[0].messages[0].message });
    }
  }
};
