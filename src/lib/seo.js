const SITE_URL = "https://www.sombustore.in";

const SITE_NAME = "Sombu Store";

const DEFAULT_IMAGE = "/images/og-image.jpg";

export function createMetadata({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  noIndex = false,
}) {
  const fullImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  return {
    title,
    description,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: url,
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
    },

    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImage],
    },
  };
}