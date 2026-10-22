import {
  Layout as DefaultLayout,
  HomeFooter,
  Link,
  useMdUrl,
} from '@rspress/core/theme-original'
import { usePage, useSite } from '@rspress/core/runtime'
import { Arrow } from './icons'
import { BrandTitle } from './brand-title'
import { FlowHome } from './home'
import { SocialHead } from './social-head'
import { socialImage } from '../flow/social'
import '../landing.css'

export * from '@rspress/core/theme-original'
export { Search } from './search'
export { SwitchAppearance } from './appearance'
export { Tabs } from './tabs'
export { Sidebar } from './sidebar'
export { NavHamburger } from './navigation'

export function HomeLayout() {
  return <FlowHome />
}

function DocContext() {
  const { page } = usePage()
  const path = page.routePath ?? ''
  const kind = path.startsWith('/spec/')
    ? 'Specification'
    : path.startsWith('/contracts/')
      ? 'Contract guide'
      : ['/use-cases', '/time-travel-handoff', '/orchestration-patterns'].some((route) =>
            path.startsWith(route),
          )
        ? 'Research'
        : 'Guide'
  if (import.meta.env.SSG_MD) return null
  return (
    <div className="doc-context">
      <Link href="/guide/overview">Documentation</Link>
      <span aria-hidden="true">/</span>
      <span>{kind}</span>
      <span className="doc-stage">Prerelease</span>
    </div>
  )
}

export function Layout() {
  const { site } = useSite()
  const { page } = usePage()
  const home = page.frontmatter?.pageType === 'home'
  const isCustom = page.frontmatter?.pageType === 'custom'
  if (home)
    return <DefaultLayout HomeLayout={HomeLayout} top={<SocialHead image={socialImage} />} />
  return (
    <div className="experience" data-product={site.title.toLowerCase()}>
      {!import.meta.env.SSG_MD && isCustom && (
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
      )}
      <DefaultLayout
        top={<SocialHead image={socialImage} />}
        navTitle={<BrandTitle />}
        beforeDocContent={<DocContext />}
        bottom={isCustom ? <HomeFooter /> : undefined}
      />
    </div>
  )
}

/** A direct resource link avoids an unnecessary dropdown for one action. */
export function LlmsViewOptions() {
  const { pathname } = useMdUrl()
  return (
    <a className="rp-llms-button markdown-link" href={pathname}>
      View Markdown
      <Arrow />
    </a>
  )
}
