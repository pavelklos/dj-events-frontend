// _rfc
import { useRouter } from "next/router";
// import Layout from "../../components/Layout";
import Layout from "@/components/Layout";

export default function EventPage() {
  const router = useRouter();
  // console.log(router);

  return (
    <Layout title={`DJ Event : ${router.query.slug}`}>
      <h1>Event Detail</h1>
      <h3>{router.query.slug}</h3>
      <button onClick={() => router.push("/")} className='btn'>
        Click (push : redirect to home page)
      </button>
    </Layout>
  );
}
