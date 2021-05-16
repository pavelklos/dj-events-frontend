import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method !== "GET") {
    // [405] Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } else {
    // Check cookie in request
    if (!req.headers.cookie) {
      // [403] Forbidden
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // Parse token from cookie
    const { token } = cookie.parse(req.headers.cookie);

    // [STRAPI]
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const strapiData = await strapiRes.json(); // user
    if (strapiRes.ok) {
      // [200] OK
      res.status(200).json({ user: strapiData });
    } else {
      // ERROR
      // res
      //   .status(strapiData.statusCode)
      //   .json({ message: strapiData.message[0].messages[0].message });
      // [403] Forbidden
      res.status(403).json({ message: "User forbidden" });
    }
  }
};
