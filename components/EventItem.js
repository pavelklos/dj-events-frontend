// _rfc
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem(props) {
  const { event } = props;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        {/* <img src={event.image} alt={event.name} /> */}
        <Image
          src={event.image ? event.image : "/images/event-default.png"}
          width={170}
          height={100}
          // layout='responsive'
          objectFit='cover'
        />
      </div>
      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
}
