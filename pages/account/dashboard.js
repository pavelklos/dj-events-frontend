// _rfc
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";

export default function DashboardPage(props) {
  const { events, user } = props;
  // console.log({ events, user });
  const { username, email, created_at } = user;
  const createdAt = new Date(created_at).toLocaleString("cs-CZ");

  return (
    <Layout>
      <h1>Dashboard - Events ({events.length})</h1>
      <p>
        <b>{username}</b> (email: <b>{email}</b> - created: <b>{createdAt}</b>)
      </p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context.req);
  // console.log(token);

  // User's Events
  const eventsRes = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const eventsData = await eventsRes.json();

  // Logged in User
  const userRes = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = await userRes.json();

  return {
    props: {
      events: eventsData,
      user: userData,
    },
  };
}
