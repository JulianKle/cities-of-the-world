import { cities } from "@/lib/data";
import Link from "next/link";

export default function Cities() {
  return (
    <ul>
      {cities.map((city) => {
        return (
          <li key={city.id}>
            <Link href={`/cities/${city.slug}`}>{city.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
