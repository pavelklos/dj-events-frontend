// _rfc
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import styles from "@/styles/Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage(props) {
  const { events, user } = props;
  const { token } = props;
  // console.log({ events, user });
  // console.log(token);
  const { username, email, created_at } = user;
  const createdAt = new Date(created_at).toLocaleString("cs-CZ");
  const router = useRouter();

  // const deleteEvent = (id) => {
  //   console.log("Delete Event:", id);
  // };

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      // console.log("deleteEvent()");
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          toast.error(`[${res.status}] Unauthorized`);
          return;
        }
        toast.error(data.message);
      } else {
        // router.push("/events");
        router.reload(); // RELOAD : TO STAY ON DASHBOARD
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <ToastContainer />
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
      token,
    },
  };
}
