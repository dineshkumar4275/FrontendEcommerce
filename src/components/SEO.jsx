'use client';

import { 
  NextSeo, 
  ProductJsonLd, 
  BreadcrumbJsonLd,
  OrganizationJsonLd,
  ArticleJsonLd,
  FAQPageJsonLd,
  LocalBusinessJsonLd
} from 'next-seo';

export const SEO = ({
  title,
  description,
  canonicalUrl,
  image,
  noIndex = false,
  pageType = 'website',
  organization,
  product,
  breadcrumbs,
  article,
  faqs,
  localBusiness,
}) => {
 const siteName = "Sombu Store";
const defaultTitle =
  "Sombu Store | Online Shopping Store in Chennai, Tamil Nadu";

const defaultDescription =
  "Buy premium T-Shirts, clothing, fashion and accessories online from Sombu Store. Fast delivery across Chennai, Tamil Nadu and all over India.";

const siteUrl = "https://www.sombu.in";
const defaultImage = "https://www.sombu.in/favicon.ico";

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;

  // Generate keywords based on page type
 const getKeywords = () => {
  const baseKeywords = [
    "Sombu Store",
    "Sombu",
    "Sombu Chennai",
    "Sombu Tamil Nadu",
    "Online Shopping Chennai",
    "Online Shopping Tamil Nadu",
    "Premium T Shirts",
    "Oversized T Shirts",
    "Fashion Store Chennai",
    "Clothing Store Tamil Nadu",
    "Buy T Shirts Online",
    "Streetwear India",
    "Mens Clothing",
    "Womens Clothing"
  ];

  if (pageType === "product" && product) {
    return [
      product.name,
      product.category,
      product.brand || "Sombu Store",
      ...baseKeywords
    ].join(", ");
  }

  return baseKeywords.join(", ");
};

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        noindex={noIndex}
        nofollow={noIndex}
        openGraph={{
          url: canonicalUrl || siteUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: seoImage,
              width: 1200,
              height: 630,
              alt: seoTitle,
            },
          ],
          site_name: siteName,
          type: pageType === 'product' ? 'product' : 
                pageType === 'article' ? 'article' : 'website',
        }}
        twitter={{
          handle: '@sombustore',
          site: '@sombustore',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: getKeywords(),
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'robots',
            content: noIndex ? 'noindex, nofollow' : 'index, follow',
          },
          {
            name: 'theme-color',
            content: '#7c3aed',
          },
          {
            name: 'author',
            content: 'sombustore',
          },
        ]}
      />

      {organization && (
        <OrganizationJsonLd
          name={organization.name || siteName}
          logo={organization.logo || `${siteUrl}/logo.png`}
          url={organization.url || siteUrl}
          description={organization.description || seoDescription}
          sameAs={organization.sameAs || [
            'https://facebook.com/sombustore',
            'https://instagram.com/sombustore',
            'https://twitter.com/sombustore',
            'https://youtube.com/sombustore',
          ]}
          contactPoint={[
            {
              telephone: organization.phone || '+91-9042909734',
              contactType: 'customer service',
              availableLanguage: ['English', 'Tamil', 'Hindi'],
              areaServed: 'IN',
            },
          ]}
        />
      )}

      {product && (
        <ProductJsonLd
          productName={product.name}
          images={product.images || [product.image_url]}
          description={product.description}
          brand={product.brand || siteName}
          sku={product.sku || product.id}
          mpn={product.mpn || `MPN-${product.id}`}
          offers={{
            price: product.price || 0,
            priceCurrency: 'INR',
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: {
              name: siteName,
            },
            shippingDetails: {
              shippingRate: {
                value: 0,
                currency: 'INR',
              },
              shippingDestination: {
                addressCountry: 'IN',
              },
              deliveryTime: {
                businessDays: 5,
              },
            },
          }}
          aggregateRating={product.rating ? {
            ratingValue: product.rating,
            reviewCount: product.review_count || 0,
          } : undefined}
        />
      )}

      {breadcrumbs && breadcrumbs.length > 1 && (
        <BreadcrumbJsonLd
          itemListElements={breadcrumbs.map((item, index) => ({
            position: index + 1,
            name: item.name,
            item: item.url,
          }))}
        />
      )}

      {article && (
        <ArticleJsonLd
          url={article.url || canonicalUrl || siteUrl}
          headline={article.headline || seoTitle}
          description={article.description || seoDescription}
          image={article.image || seoImage}
          datePublished={article.datePublished || new Date().toISOString()}
          dateModified={article.dateModified || new Date().toISOString()}
          authorName={article.authorName || siteName}
          publisherName={article.publisherName || siteName}
          publisherLogo={article.publisherLogo || `${siteUrl}/logo.png`}
          isAccessibleForFree={true}
        />
      )}

      {faqs && faqs.length > 0 && (
        <FAQPageJsonLd
          mainEntity={faqs.map((faq) => ({
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          }))}
        />
      )}

      {localBusiness && (
        <LocalBusinessJsonLd
          name={localBusiness.name || siteName}
          description={localBusiness.description || seoDescription}
          url={localBusiness.url || siteUrl}
          telephone={localBusiness.phone || '+91-9042909734'}
          address={{
            streetAddress: localBusiness.address || 'sombustore Address',
            addressLocality: localBusiness.city || 'Chennai',
            addressRegion: localBusiness.state || 'Tamil Nadu',
            postalCode: localBusiness.zip || '600001',
            addressCountry: 'IN',
          }}
          geo={{
            latitude: localBusiness.lat || '13.0827',
            longitude: localBusiness.lng || '80.2707',
          }}
          priceRange={localBusiness.priceRange || '₹₹'}
          openingHours={localBusiness.openingHours || [
            {
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '21:00',
            },
            {
              days: ['Saturday', 'Sunday'],
              opens: '10:00',
              closes: '20:00',
            },
          ]}
        />
      )}
    </>
  );
};

export default SEO;