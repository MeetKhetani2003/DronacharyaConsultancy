import GalleryPage from "@/views/Gallery";
import connectToDatabase from "@/lib/mongodb";
import Media from "@/models/Media";

export const revalidate = 0; // Disable caching to always show latest media

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
