import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method !== "POST") {
    // [405] Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } else {
    // Destroy cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // false = development, true
        // maxAge: 60 * 60 * 24 * 7, // [1 week] = 60 sec * 60 min * 24 hours * 7 days
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Success - Cookie destroyed" });
  }
};
