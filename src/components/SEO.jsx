import { NextSeo, ProductJsonLd, ReviewJsonLd, BreadcrumbJsonLd } from 'next-seo';

export const SEO = ({
  title,
  description,
  canonicalUrl,
  image,
  product,
  breadcrumbs,
  category,
  noIndex = false,
}) => {
  // Default SEO values
  const siteName = 'sombustore';
  const defaultTitle = 'Premium Products - sombu store';
  const defaultDescription = 'Shop premium products with amazing offers. Free shipping & easy returns.';
  const defaultImage = '/images/og-image.jpg';

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
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
        }}
        twitter={{
          handle: '@Sombustore',
          site: '@Sombustore',
          cardType: 'summary_large_image',
        }}
        noindex={noIndex}
        nofollow={noIndex}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'shop, premium products, online store, buy products',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'robots',
            content: noIndex ? 'noindex, nofollow' : 'index, follow',
          },
        ]}
      />

      {/* Product Schema */}
      {product && (
        <ProductJsonLd
          productName={product.name}
          images={product.images || [product.image]}
          description={product.description}
          brand={product.brand || siteName}
          sku={product.sku || product.id}
          gtin8={product.gtin}
          mpn={product.mpn}
          material={product.material}
          color={product.color}
          offers={{
            price: product.price,
            priceCurrency: 'INR',
            priceValidUntil: product.priceValidUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: {
              name: siteName,
            },
          }}
          aggregateRating={product.rating ? {
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 0,
          } : undefined}
          reviews={product.reviews ? product.reviews.map((review, index) => ({
            author: {
              type: 'Person',
              name: review.author || 'Customer',
            },
            datePublished: review.date || new Date().toISOString(),
            reviewBody: review.body || review.text,
            reviewRating: {
              ratingValue: review.rating || 5,
              bestRating: 5,
            },
          })) : undefined}
        />
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd
          itemListElements={breadcrumbs.map((item, index) => ({
            position: index + 1,
            name: item.name,
            item: item.url,
          }))}
        />
      )}
    </>
  );
};

export default SEO;