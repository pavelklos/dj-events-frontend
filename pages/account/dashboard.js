// _rfc
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import styles from "@/styles/Dashboard.module.css";

export default function DashboardPage(props) {
  const { events, user } = props;
  // console.log({ events, user });
  const { username, email, created_at } = user;
  const createdAt = new Date(created_at).toLocaleString("cs-CZ");

  const deleteEvent = (id) => {
    console.log("Delete Event:", id);
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <p>
          <b>{username}</b> (email: <b>{email}</b> - created: <b>{createdAt}</b>
          )
        </p>
        <h3>My Events ({events.length})</h3>

        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
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
