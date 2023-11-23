import { useRouter } from "next/router";
import { cities } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";

export default function DetailSite() {
  const router = useRouter();
  const { slug } = router.query;

  const [picture, setPicture] = useState("");

  const city = cities.find((city) => city.slug === slug);

  useEffect(() => {
    async function startFetching() {
      if (!slug) {
        return null;
      }
      const response = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${slug}/images/`
      );
      const pictureObject = await response.json();
      setPicture(pictureObject.photos[0]?.image?.web);
    }

    startFetching();
  }, [slug]);

  if (!city) {
    return null;
  }

  return (
    <>
      <h1>{city.name}</h1>
      <h2>{city.country}</h2>
      <ul>
        Information:
        <li>{city.description}</li>
        <li>{city.population}</li>
      </ul>

      <Image
        src={picture}
        height={200}
        width={1200}
        quality={100}
        alt={`A picture of a ${city.name}`}
      ></Image>

      <nav>
        <Link href="/cities">Back to overviev</Link>
      </nav>
    </>
  );
}
