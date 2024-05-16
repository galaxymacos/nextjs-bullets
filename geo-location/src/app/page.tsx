import Image from "next/image";
import GeoLocationCard from "@/app/_component/geo-location-card";

export default function Home() {
  return (
      <div className={"min-h-screen flex flex-col items-center justify-center"}>
        <GeoLocationCard/>
      </div>
  );
}
