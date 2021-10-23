import React from 'react';
import { OpenGraphMetadata, SuperSEO, TwitterSummaryCardType } from 'react-super-seo';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../settings/useSettings';

export interface HeadProps {
  contentTitle?: string;
  seo?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
  };
  templateTagRenderer?: TemplateTagRenderer;
  children?: React.ReactNode;
}

/**
 * Any of the SEO values can be overridden via the `seo` prop. Otherwise, they fall back on defaults from the site settings, where possible.
 *
 * When not specified, the SEO title will use the `seoTitleFormat` defined in settings, which by default combines the content title
 * with the site name, using a separator between the two. In this case, the content title should be provided
 * either via the `contentTitle` prop, or as a mapping in the `templateTagRenderer` prop.
 */
export default function Head(props: HeadProps): JSX.Element {
  const settings: Settings = useSettings();
  const settingsTemplateTagRenderer = settings.getTemplateTagRenderer();
  let templateTagRenderer = props.templateTagRenderer
    ? settingsTemplateTagRenderer.combineWith(props.templateTagRenderer)
    : settingsTemplateTagRenderer;

  // If a contentTitle was provided, add it to the template tag renderer.
  if (typeof props.contentTitle !== 'undefined') {
    templateTagRenderer = templateTagRenderer.combineWith(
      new TemplateTagRenderer({ contentTitle: props.contentTitle }),
    );
  }

  const lang = 'en';

  const seoTitleFormat = settings.data.settingsYaml.seoTitleFormat;
  const seoTitle = props.seo?.title
    ? templateTagRenderer.render(props.seo.title)
    : templateTagRenderer.render(seoTitleFormat);
  const seoDescription = props.seo?.description ? templateTagRenderer.render(props.seo?.description) : undefined;
  let seoImageUrl = settings.data.site.siteMetadata.siteImage;
  let seoImageWidth = settings.data.site.siteMetadata.siteImageWidth;
  let seoImageHeight = settings.data.site.siteMetadata.siteImageHeight;
  let seoImageAlt: string | undefined =
    settings.data.site.siteMetadata.siteImageAlt !== 'none'
      ? templateTagRenderer.render(settings.data.site.siteMetadata.siteImageAlt)
      : undefined;

  if (props.seo?.imageUrl && props.seo?.imageUrl !== 'none' && props.seo?.imageWidth && props.seo?.imageHeight) {
    seoImageUrl = props.seo?.imageUrl;
    seoImageWidth = props.seo?.imageWidth;
    seoImageHeight = props.seo?.imageHeight;
    seoImageAlt =
      props.seo?.imageAlt && props.seo?.imageAlt !== 'none'
        ? templateTagRenderer.render(props.seo?.imageAlt)
        : undefined;
  }

  // If the twitter site username is none, set it to undefined.
  const twitterSiteUsername =
    settings.data.settingsYaml.twitterSiteUsername !== 'none'
      ? settings.data.settingsYaml.twitterSiteUsername
      : undefined;

  const openGraph: OpenGraphMetadata = {
    ogUrl: typeof window !== 'undefined' ? window.location.href : '',
    ogTitle: seoTitle,
    ogTypeObject: {},
    ogImage: {
      ogImage: seoImageUrl,
      ogImageAlt: seoImageAlt,
      ogImageWidth: seoImageWidth,
      ogImageHeight: seoImageHeight,
    },
    ogDescription: seoDescription,
    ogSiteName: settings.data.site.siteMetadata.siteName,
  };
  const twitterCard: TwitterSummaryCardType = {
    summaryCardSiteUsername: twitterSiteUsername,
    summaryCardTitle: seoTitle,
    summaryCardDescription: seoDescription,
    summaryCardImage: seoImageUrl,
    summaryCardImageAlt: seoImageAlt,
  };

  return (
    <SuperSEO
      title={seoTitle}
      description={seoDescription}
      lang={lang}
      openGraph={openGraph}
      twitter={{
        twitterSummaryCard: twitterCard,
      }}
    >
      {props.children}
    </SuperSEO>
  );
}
