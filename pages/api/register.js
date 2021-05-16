import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method !== "POST") {
    // [405] Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } else {
    const { username, email, password } = req.body;
    // console.log(req.body);
    // res.status(200).json({ username, email, password });
    // [STRAPI]
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const strapiData = await strapiRes.json();
    if (strapiRes.ok) {
      // console.log(strapiData.jwt);
      // @todo - Set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", strapiData.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development", // false = development, true
          maxAge: 60 * 60 * 24 * 7, // [1 week] = 60 sec * 60 min * 24 hours * 7 days
          sameSite: "strict",
          path: "/",
        })
      );

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
