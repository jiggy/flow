import { useFrontmatter, useHead, usePage, useSite, withBase, withSiteOrigin } from '@rspress/core/runtime'

export interface SocialImage {
  src: string
  width: number
  height: number
  type: string
  alt: string
}

/** Supply share defaults while native Rspress retains page titles and descriptions. */
export function SocialHead({ image }: { image: SocialImage }) {
  if (import.meta.env.SSG_MD) return null

  const { page } = usePage()
  const { site } = useSite()
  const { frontmatter } = useFrontmatter()
  const overrides = new Map(
    (frontmatter.head ?? [])
      .filter(([tag, attrs]) => tag === 'meta' && (attrs.property || attrs.name))
      .map(([, attrs]) => [attrs.property || attrs.name, attrs.content]),
  )
  const customImage = overrides.has('og:image')
  const imageUrl = overrides.get('og:image') || withSiteOrigin(withBase(image.src))
  const imageAlt = overrides.get('og:image:alt') || (customImage ? undefined : image.alt)
  const twitterAlt = overrides.has('twitter:image') ? undefined : imageAlt
  const meta = [
    { property: 'og:url', content: withSiteOrigin(withBase(page.routePath || '/')) },
    { property: 'og:site_name', content: site.title },
    { property: 'og:image', content: imageUrl },
    ...(!customImage
      ? [
          { property: 'og:image:width', content: String(image.width) },
          { property: 'og:image:height', content: String(image.height) },
          { property: 'og:image:type', content: image.type },
        ]
      : []),
    ...(imageAlt ? [{ property: 'og:image:alt', content: imageAlt }] : []),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: imageUrl },
    ...(twitterAlt ? [{ name: 'twitter:image:alt', content: twitterAlt }] : []),
  ]

  useHead({
    meta: meta.filter((entry) => !overrides.has(entry.property || entry.name || '')),
  })
  return null
}
