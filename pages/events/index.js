// _rfc
// import Link from "next/link";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage(props) {
  const { events, page, total } = props;
  const lastPage = Math.ceil(total / PER_PAGE);
  // console.log(events);

  return (
    <Layout>
      <h1>Events ({events.length})</h1>
      <h3>
        page [{page}/{lastPage}] - PER_PAGE [{PER_PAGE}] - total [{total}]
      </h3>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

// export async function getStaticProps() {
export async function getServerSideProps(context) {
  // console.log(context); // req, res, query
  const {
    query: { page = 1 },
  } = context;

  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalCountUrl = `${API_URL}/events/count`;
  const totalCountRes = await fetch(totalCountUrl);
  const totalCount = await totalCountRes.json();

  // const url = `/api/events`;
  // const url = `${API_URL}/api/events`;
  // const url = `${API_URL}/events?_sort=date:ASC`;
  const eventUrl = `${API_URL}/events?_sort=date:ASC&_start=${start}&_limit=${PER_PAGE}`;
  const eventRes = await fetch(eventUrl);
  const data = await eventRes.json();
  // console.log(data);

  return {
    props: {
      events: data,
      page: +page,
      total: totalCount,
    },
    // revalidate: 60, // 60 sec : IF DATA WILL CHANGE -> NEW REQUEST (FETCH) TO GET NEW DATA
  };
}
