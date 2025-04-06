type ImageComponentProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function Image({
  src,
  alt,
  className,
  width,
  height,
}: ImageComponentProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
}
