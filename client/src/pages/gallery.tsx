import React, { useEffect, useState } from "react";

const API_URL = "/api/gallery";

export default function GalleryPage() {
  const [premises, setPremises] = useState([]);
  const [events, setEvents] = useState([]);
  const [others, setOthers] = useState([]);

  // Fetch images from backend
  const fetchImages = async (section: string, setter: any) => {
    const res = await fetch(`${API_URL}?section=${section}`);
    const data = await res.json();
    setter(data);
  };

  useEffect(() => {
    fetchImages("premises", setPremises);
    fetchImages("events", setEvents);
    fetchImages("others", setOthers);
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-maroon-800">Gallery</h1>
      {/* Premises Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-maroon-700">Company Premises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {premises.map((img: any) => (
            <img key={img.id} src={img.url} alt="Premises" className="rounded-lg shadow-md object-cover w-full h-48" />
          ))}
        </div>
      </section>
      {/* Events Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-maroon-700">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((img: any) => (
            <img key={img.id} src={img.url} alt="Event" className="rounded-lg shadow-md object-cover w-full h-48" />
          ))}
        </div>
      </section>
      {/* Others Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-maroon-700">Other Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {others.map((img: any) => (
            <img key={img.id} src={img.url} alt="Other" className="rounded-lg shadow-md object-cover w-full h-48" />
          ))}
        </div>
      </section>
    </div>
  );
} 