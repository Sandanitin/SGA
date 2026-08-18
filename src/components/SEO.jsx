import React, { useEffect } from 'react';

export function SEO({
  title = "SGA Academy - Compare Best Proprietary Trading Firms & Giveaways",
  description = "Discover today's biggest prop firm deals, compare top proprietary trading firms, win free evaluation accounts and cash prizes with SGA Trading Academy.",
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage
}) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update OpenGraph Title & Description
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', ogTitle || title);
    }

    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', ogDescription || description);
    }

    // Update Twitter Title & Description
    let twTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twTitleTag) {
      twTitleTag.setAttribute('content', ogTitle || title);
    }

    let twDescTag = document.querySelector('meta[name="twitter:description"]');
    if (twDescTag) {
      twDescTag.setAttribute('content', ogDescription || description);
    }

    // Update Canonical URL
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonicalUrl);
      }
    }
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage]);

  return null;
}

export default SEO;
