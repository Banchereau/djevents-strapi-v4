import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, pageTotal }) {
  
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
      <Pagination page={page} total={pageTotal} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const res = await fetch(
    `${API_URL}/api/events?sort=date&populate=image&pagination[pageSize]=${PER_PAGE}&pagination[page]=${page}`
  );
  const events = await res.json();
  
  return {
    props: {
      events: events.data,
      page: events.meta.pagination.page,
      pageTotal: events.meta.pagination.pageCount,
    },
  };
}
