// _rfc
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventsPage(props) {
  const { events } = props;
  // console.log(events);

  return (
    <Layout>
      <h1>Events ({events.length})</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  // export async function getServerSideProps(context) {
  // console.log(context); // req, res, query

  // const url = `/api/events`;
  // const url = `${API_URL}/api/events`;
  const url = `${API_URL}/events?_sort=date:ASC`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      events: data,
    },
    revalidate: 60, // 60 sec : IF DATA WILL CHANGE -> NEW REQUEST (FETCH) TO GET NEW DATA
  };
}
