import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Result">
      <Link href="/events">Go back</Link>
      <h1>Search result for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
        ],
      },
      populate: "image",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
