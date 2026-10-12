import ImageReveal from "@/components/common/ImageReveal";

export default function GalleryGrid({ images, name }) {
  if (!images || images.length === 0) return null;
  return (
    <div data-testid="project-gallery" className="mt-6 grid gap-5 sm:grid-cols-2">
      {images.map((src, i) => (
        <ImageReveal
          key={src}
          src={src}
          alt={`${name} — representative visual ${i + 1}`}
          className={`rounded-xl ${i % 3 === 0 ? "sm:col-span-2 aspect-[21/9]" : "aspect-[4/3]"}`}
          delay={Math.min(i * 0.08, 0.3)}
        />
      ))}
    </div>
  );
}
