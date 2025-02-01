import Image from "next/image";
import path from "path";

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  slug?: string;
}

export default function MdxImage({
  src,
  alt,
  width = 500,
  height = 300,
  slug = ""
}: MdxImageProps) {
  const isExternal = src.startsWith("http");
  const isRelative = src.startsWith("./");

  const fullSrc = isExternal
    ? src
    : isRelative
    ? path.join(slug, src)
    : path.join(src);

  return (
    <div className="w-full">
      <Image
        src={fullSrc}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "auto"
        }}
      />
    </div>
  );
}
