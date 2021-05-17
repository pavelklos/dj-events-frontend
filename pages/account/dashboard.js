// _rfc
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";

export default function DashboardPage(props) {
  const { events } = props;
  console.log(events);

  return (
    <Layout>
      <h1>Dashboard</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context.req);
  // console.log(token);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      events: data,
    },
  };
}
