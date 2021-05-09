// _rfc
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaPencilAltAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
// import Layout from "../../components/Layout";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";

export default function EventPage(props) {
  const { event } = props;
  // console.log(event);
  const router = useRouter();
  // console.log(router);

  const deleteEvent = (e) => {
    e.preventDefault();
  };

  return (
    <Layout title={`DJ Event : ${router.query.slug}`}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {event.date} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image}
              width={960}
              height={600}
              objectFit='cover'
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>
        <h1>MAP</h1>
        <Link href='/events'>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
      {/* <h1>{event.name}</h1>
      <h3>{router.query.slug}</h3>
      <button onClick={() => router.push("/")} className='btn'>
        Click (push : redirect to home page)
      </button> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { slug } = query;
  // console.log(query);

  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const data = await res.json(); // events : array
  // console.log(data);

  return {
    props: { event: data[0] },
  };
}

// export async function getStaticProps(context) {
//   const { params } = context;
//   const { slug } = params;
//   // console.log(params);

//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const data = await res.json(); // events : array
//   // console.log(data);

//   return {
//     props: { event: data[0] },
//     revalidate: 60, // 60 sec : IF DATA WILL CHANGE -> NEW REQUEST (FETCH) TO GET NEW DATA
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const data = await res.json();
//   // console.log(data);
//   // { params: { slug: 'slug' } },
//   const paths = data.map((event) => ({ params: { slug: event.slug } }));
//   // console.log(paths);

//   return {
//     paths: paths,
//     fallback: true,
//     // false -> 404
//     // true -> IF DATA WILL CHANGE -> NEW REQUEST (FETCH) TO GET NEW DATA
//   };
// }
