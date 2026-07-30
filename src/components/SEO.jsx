'use client';

import { 
  NextSeo, 
  ProductJsonLd, 
  BreadcrumbJsonLd,
  OrganizationJsonLd,
  WebSiteJsonLd,
  ArticleJsonLd,
  FAQPageJsonLd,
  LocalBusinessJsonLd,
  CollectionPageJsonLd
} from 'next-seo';

export const SEO = ({
  title,
  description,
  canonicalUrl,
  image,
  noIndex = false,
  pageType = 'website',
  organization,
  website,
  product,
  breadcrumbs,
  article,
  faqs,
  localBusiness,
  collection,
}) => {
  const siteName = 'Sombustore';
  const defaultTitle = 'Sombustore - Premium Products';
  const defaultDescription = 'Shop premium products with amazing offers. Free shipping & easy returns.';
  const defaultImage = '/images/og-image.jpg';
  const siteUrl = 'https://www.sombustore.in';

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;

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
                pageType === 'article' ? 'article' : 
                pageType === 'faq' ? 'website' : 
                pageType === 'localbusiness' ? 'website' : 'website',
        }}
        twitter={{
          handle: '@yourstore',
          site: '@yourstore',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'shop, premium products, online store, buy products, best deals',
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
        ]}
      />

      {organization && (
        <OrganizationJsonLd
          name={organization.name || siteName}
          logo={organization.logo || `${siteUrl}/logo.png`}
          url={organization.url || siteUrl}
          description={organization.description || seoDescription}
          sameAs={organization.sameAs || [
            'https://facebook.com/yourstore',
            'https://instagram.com/yourstore',
          ]}
          contactPoint={[
            {
              telephone: organization.phone || '+91-1234567890',
              contactType: 'customer service',
              availableLanguage: ['English', 'Hindi'],
              areaServed: 'IN',
            },
          ]}
        />
      )}

      {website && (
        <WebSiteJsonLd
          name={website.name || siteName}
          description={website.description || seoDescription}
          url={website.url || siteUrl}
          potentialAction={{
            target: `${website.url || siteUrl}/search?q={search_term_string}`,
            queryInput: 'required name=search_term_string',
          }}
        />
      )}

      {product && (
        <ProductJsonLd
          productName={product.name}
          images={product.images || [product.image_url]}
          description={product.description}
          brand={product.brand || siteName}
          sku={product.sku || product.id}
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
          telephone={localBusiness.phone || '+91-1234567890'}
          address={{
            streetAddress: localBusiness.address || 'Sombustore Address',
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
        />
      )}

      {collection && (
        <CollectionPageJsonLd
          name={collection.name || 'Product Collection'}
          description={collection.description || seoDescription}
          url={collection.url || canonicalUrl || siteUrl}
        />
      )}
    </>
  );
};

export default SEO;