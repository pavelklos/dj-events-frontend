// _rfc
import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function SearchPage(props) {
  const { events } = props;
  // console.log(events);
  const router = useRouter();
  const { term } = router.query;
  // console.log(router);

  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for '{term}'</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // console.log(context); // req, res, query
  const {
    query: { term },
  } = context;
  // console.log(term);

  // const url = `/api/events`;
  // const url = `${API_URL}/api/events`;
  // const url = `${API_URL}/events?_sort=date:ASC`;
  // const url = `${API_URL}/events?name_contains=${term}`;

  // [qs] npm
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const url = `${API_URL}/events?${query}`;

  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      events: data,
    },
    // revalidate: 60, // 60 sec : IF DATA WILL CHANGE -> NEW REQUEST (FETCH) TO GET NEW DATA
  };
}
