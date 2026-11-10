import { resolve } from 'node:path'
import { defineConfig } from '@rspress/core'
import { documentationIndex } from '../theme/llms'
import { accessibleMarkdown } from '../theme/accessible-markdown'
import { diagramImages } from '../theme/diagram-images'
import { codeThemes } from '../theme/code-themes'

const siteDirectory = import.meta.dirname

const start = {
  "text": "Start here",
  "items": [
    {
      "text": "Choose your next step",
      "link": "/start/"
    },
    {
      "text": "Run your first Flow",
      "link": "/start/run"
    },
    {
      "text": "Call it from your application",
      "link": "/start/application"
    }
  ]
}
const build = {
  "text": "Build",
  "items": [
    {
      "text": "Choose an authoring path",
      "link": "/build/"
    },
    {
      "text": "Bring a Skill",
      "link": "/build/skills"
    },
    {
      "text": "Write Markdown",
      "link": "/build/markdown"
    },
    {
      "text": "Write TypeScript or JavaScript",
      "link": "/build/typescript"
    },
    {
      "text": "Write Python",
      "link": "/build/python"
    },
    {
      "text": "Compose methods",
      "link": "/build/compose"
    },
    {
      "text": "Handle outcomes and failures",
      "link": "/build/outcomes"
    },
    {
      "text": "Validate inputs and results",
      "link": "/build/validation"
    },
    {
      "text": "Exchange messages",
      "link": "/build/messages"
    },
    {
      "text": "Design reusable Flows",
      "link": "/build/design"
    }
  ]
}
const understand = {
  "text": "Understand",
  "items": [
    {
      "text": "What FLOW adds",
      "link": "/understand/"
    },
    {
      "text": "Hosts and runtimes",
      "link": "/understand/hosts-and-runtimes"
    },
    {
      "text": "Calls and channels",
      "link": "/understand/calls-and-channels"
    },
    {
      "text": "When contracts help",
      "link": "/understand/contracts"
    }
  ]
}
const implement = {
  "text": "Implement FLOW",
  "items": [
    {
      "text": "Add FLOW support",
      "link": "/implement/"
    },
    {
      "text": "Implement a host",
      "link": "/implement/host"
    },
    {
      "text": "Implement an SDK",
      "link": "/implement/sdk"
    },
    {
      "text": "Connect an ACP agent",
      "link": "/implement/acp"
    },
    {
      "text": "Verify an implementation",
      "link": "/implement/verify"
    }
  ]
}
const reference = {
  "text": "Reference",
  "items": [
    {
      "text": "Find an API or contract",
      "link": "/reference/"
    },
    {
      "text": "Hosts, runtimes, and SDKs",
      "link": "/reference/support"
    },
    {
      "text": "SDK API",
      "link": "/reference/sdk"
    },
    {
      "text": "Markdown recipes",
      "link": "/reference/markdown"
    },
    {
      "text": "Skill compatibility",
      "link": "/reference/skill-compatibility"
    },
    {
      "text": "Glossary",
      "link": "/reference/glossary"
    }
  ]
}
const specifications = {
  "text": "Specifications",
  "items": [
    {
      "text": "Package format · Package/0",
      "link": "/spec/package-format"
    },
    {
      "text": "Invocation · Run/0",
      "link": "/spec/run-protocol"
    },
    {
      "text": "SDK behavior · Run SDK/0",
      "link": "/spec/run-sdk"
    },
    {
      "text": "Portable values · JSON/0",
      "link": "/spec/json-values"
    },
    {
      "text": "Validation · Schema/0",
      "link": "/spec/schema-files"
    },
    {
      "text": "Invocation contracts",
      "link": "/spec/invocation-contracts"
    },
    {
      "text": "Markdown runtime",
      "link": "/spec/markdown-runtime"
    },
    {
      "text": "Channel contracts",
      "link": "/spec/channel-contracts"
    }
  ]
}
const evidence = {
  "text": "Evidence",
  "items": [
    {
      "text": "Skill interpreter experiment",
      "link": "/evidence/skills"
    }
  ]
}
const utilities = {
  "text": "For agents",
  "items": [
    {
      "text": "Read and author with an agent",
      "link": "/for-agents"
    }
  ]
}
const documentation = [start, build, understand, implement, reference, specifications, evidence, utilities]
const sidebar = {
  '/start/': [start],
  '/build/': [build],
  '/understand/': [understand],
  '/implement/': [implement],
  '/reference/': [reference, specifications],
  '/spec/': [specifications, reference],
  '/evidence/': [evidence],
  '/for-agents': [utilities],
  '/': [start],
}

export default defineConfig({
  root: resolve(siteDirectory, '../../docs/flow'),
  themeDir: resolve(siteDirectory, '../theme'),
  globalStyles: resolve(siteDirectory, 'diagrams.css'),
  markdown: {
    remarkPlugins: [diagramImages],
    rehypePlugins: [accessibleMarkdown],
    shiki: codeThemes,
  },
  llms: { llmsTxt: documentationIndex(documentation) },
  route: { exclude: ['**/AGENTS.md'] },
  outDir: process.env.PUBLIC_SITE_OUTPUT ?? resolve(siteDirectory, 'doc_build'),
  siteOrigin: 'https://flow.jig.md',
  title: 'FLOW',
  description: 'Call reusable methods implemented with code, Agent instructions, or both.',
  icon: new URL('./public/favicon.svg', import.meta.url).href,
  logo: {
    light: '/mark.svg',
    dark: '/mark-light.svg',
  },
  logoText: 'FLOW',
  builderConfig: {
    server: {
      publicDir: {
        name: resolve(siteDirectory, 'public'),
      },
    },
    output: {
      cleanDistPath: false,
      copy: [{ from: resolve(siteDirectory, 'public'), to: '.' }],
    },
    tools: {
      rspack: {
        module: {
          rules: [
            {
              test: /\.svg$/,
              resourceQuery: /diagram-theme=/,
              type: 'asset/resource',
              generator: { filename: 'static/svg/[name].[contenthash:10][ext]' },
              use: [resolve(siteDirectory, '../theme/diagram-theme-loader.cjs')],
            },
          ],
        },
      },
    },
  },
  themeConfig: {
    llmsUI: { placement: 'title', viewOptions: ['markdownLink'] },
    editLink: { docRepoBaseUrl: 'https://github.com/jiggy/flow/tree/main/docs/flow' },
    enableScrollToTop: true,
    nav: [
      { text: 'Start here', link: '/start/' },
      { text: 'Build', link: '/build/' },
      { text: 'Understand', link: '/understand/' },
      { text: 'Implement FLOW', link: '/implement/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'For agents', link: '/for-agents' },
      { text: 'GitHub', link: 'https://github.com/jiggy/flow' },
    ],
    sidebar,
    footer: {
      message: 'FLOW public alpha · An independent package and invocation standard.',
    },
  },
})
