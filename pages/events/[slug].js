// _rfc
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
// import Layout from "../../components/Layout";
import Layout from "@/components/Layout";

export default function EventPage(props) {
  const { event } = props;
  // console.log(event);
  const router = useRouter();
  // console.log(router);

  return (
    <Layout title={`DJ Event : ${router.query.slug}`}>
      <h1>{event.name}</h1>
      <h3>{router.query.slug}</h3>
      <button onClick={() => router.push("/")} className='btn'>
        Click (push : redirect to home page)
      </button>
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
