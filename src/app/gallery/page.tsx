import GalleryPage from "@/views/Gallery";
import connectToDatabase from "@/lib/mongodb";
import Media from "@/models/Media";

export const revalidate = 60; // Revalidate every 60 seconds to improve load time while keeping media fresh

export default async function Page() {
  await connectToDatabase();
  const media = await Media.find().sort({ createdAt: -1 }).lean();
  
  // Serialize for client component
  const serializedMedia = media.map(m => ({
    title: m.title,
    category: m.category,
    src: m.src,
  }));

  return <GalleryPage initialItems={serializedMedia} />;
}
