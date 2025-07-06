import React from "react";

const galleryData = {
  premises: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80"
  ],
  events: [
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80"
  ],
  others: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  ]
};

const Section = ({ title, images }: { title: string; images: string[] }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-4 text-maroon-700">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={title + " " + (idx + 1)}
          className="rounded-lg shadow-md object-cover w-full h-48"
        />
      ))}
    </div>
  </section>
);

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-maroon-800">Gallery</h1>
      <Section title="Company Premises" images={galleryData.premises} />
      <Section title="Events" images={galleryData.events} />
      <Section title="Other Posts" images={galleryData.others} />
    </div>
  );
} 