---
pageType: home
navbar: false
title: "Turn a Skill into a method your app can call."
description: "A proposed successor to SKILL.md. Put your agent know-how inside your software, reuse it across projects, and give the next builder a head start."
head:
  - - meta
    - property: og:title
      content: "FLOW — Turn a Skill into a method your app can call."
---

<div class="home-skip"><a class="skip-link" href="#main">Skip to content</a></div>
<header class="header">
  <nav class="nav-pill" aria-label="Main navigation">
    <a class="wordmark" href="#" aria-label="FLOW home"
      ><img src="/mark.svg" alt="" width="29" height="29" /><span>FLOW</span></a
    >
    <div class="nav-links">
      <a href="#why-flow">Explore</a><a href="/guide/overview">Docs</a
      ><a class="nav-github" href="https://github.com/jiggy/flow" aria-label="FLOW on GitHub"
        ><img src="/home/assets/brands/github.svg" width="19" height="19" alt="" /><span
          class="nav-github-label"
          >GitHub</span
        ></a
      >
    </div>
    <a class="nav-start" href="/guide/start">Start building <span aria-hidden="true">↗</span></a>
  </nav>
</header>
<main id="main">
  <section class="hero wrap" aria-labelledby="hero-title">
    <a class="announcement" href="#skills-comparison"
      ><span>Hello, FLOW</span> A proposed successor to SKILL.md
      <span aria-hidden="true">↗</span></a
    >
    <h1 id="hero-title">
      <span class="sr-only">You’ve found a useful Skill. Now use it in your app.</span
      ><span aria-hidden="true"
        ><span class="hero-line">You’ve found a useful Skill.</span
        ><span class="hero-changing"
          ><span class="is-current">Now <em>use it in your app.</em></span
          ><span>Now <em>apply it to workflows.</em></span
          ><span>Now <em>compose it with code.</em></span></span
        ></span
      >
    </h1>
    <p>
      The Skills you install already help your agent do useful work.<br class="desktop-break" />
      With FLOW, that know-how can power your applications, too.
    </p>
    <div class="actions">
      <a class="button primary" href="#why-flow">Meet FLOW <span aria-hidden="true">↓</span></a
      ><a class="button secondary" href="/guide/understand"
        >Read the proposal <span aria-hidden="true">↗</span></a
      >
    </div>
  </section>

  <section
    class="cloud-stage story-stage"
    id="why-flow"
    aria-label="Put your useful Skills to work in software"
  >
    <div class="scene-nav story-tabs" role="tablist" aria-label="Where your know-how can go">
      <button
        type="button"
        role="tab"
        id="app-story-tab"
        aria-controls="app-story-panel"
        aria-selected="true"
        tabindex="0"
        data-story="app"
      >
        In your app</button
      ><button
        type="button"
        role="tab"
        id="workflow-story-tab"
        aria-controls="workflow-story-panel"
        aria-selected="false"
        tabindex="-1"
        data-story="workflow"
      >
        In your workflow</button
      ><button
        type="button"
        role="tab"
        id="agent-story-tab"
        aria-controls="agent-story-panel"
        aria-selected="false"
        tabindex="-1"
        data-story="agent"
      >
        With your agent
      </button>
    </div>
    <div class="story-window wrap" id="story-views">
      <div
        class="story-panel"
        id="app-story-panel"
        role="tabpanel"
        aria-labelledby="app-story-tab"
        tabindex="0"
      >
        <div class="story-copy">
          <span class="story-kicker">From useful Skill to useful software</span>
          <h2>That useful Skill?<br />Make it a feature.</h2>
          <p>
            The Skill you trust can become a method your app calls. Give it data. Get a result your
            software can use.
          </p>
          <p class="story-payoff">
            A spreadsheet Skill can become the intelligence behind your import button.
          </p>
          <a class="text-link" href="#showcase"
            >Explore another use case <span aria-hidden="true">↓</span></a
          >
        </div>
        <div
          class="story-product"
          role="img"
          aria-label="An import feature uses a contact-mapping method to prepare a reviewable contact preview."
        >
          <div class="mini-product-top">
            <span class="mini-app-symbol" aria-hidden="true">⊞</span
            ><strong>Your contact importer</strong
            ><span class="mini-product-dots" aria-hidden="true">•••</span>
          </div>
          <div class="import-file">
            <span class="file-symbol" aria-hidden="true">▤</span>
            <div><strong>contacts.csv</strong><span>3 rows · ready to preview</span></div>
            <span class="file-upload-check" aria-hidden="true">✓</span>
          </div>
          <div class="method-bridge">
            <span class="bridge-line" aria-hidden="true"></span
            ><span><img src="/mark.svg" width="18" height="18" alt="" />Map contact fields</span
            ><span class="bridge-line" aria-hidden="true"></span>
          </div>
          <div class="mini-result">
            <div class="mini-avatars" aria-hidden="true">
              <span>AL</span><span>LM</span><span>GH</span>
            </div>
            <div>
              <strong>Your preview is ready.</strong><span>2 ready · 1 email to check</span>
            </div>
          </div>
          <div class="mini-product-bottom">
            <span>Know-how, inside your feature.</span
            ><span class="illustrated-button"
              >Review contacts <span aria-hidden="true">→</span></span
            >
          </div>
        </div>
      </div>
      <div
        class="story-panel"
        id="workflow-story-panel"
        role="tabpanel"
        aria-labelledby="workflow-story-tab"
        tabindex="0"
        hidden
      >
        <div class="story-copy">
          <span class="story-kicker">From a useful method to a repeatable step</span>
          <h2>Put the know-how<br />in your workflow.</h2>
          <p>
            Call a method when a file arrives. Pass its result to checks, review, or the next task.
          </p>
          <p class="story-payoff">The same contact mapper can power a step in a larger process.</p>
          <a class="text-link" href="/guide/understand#let-capability-build-on-capability"
            >Build with small methods <span aria-hidden="true">↗</span></a
          >
        </div>
        <div
          class="workflow-product"
          role="img"
          aria-label="When a spreadsheet arrives, a workflow maps contact fields, then prepares contacts for review."
        >
          <div class="mini-product-top">
            <span class="workflow-symbol" aria-hidden="true">↳</span
            ><strong>Your import workflow</strong
            ><span class="mini-product-dots" aria-hidden="true">•••</span>
          </div>
          <div class="workflow-stages">
            <div>
              <span class="workflow-step-icon" aria-hidden="true">▤</span>
              <div>
                <strong>A spreadsheet arrives</strong><span>Start with the source file</span>
              </div>
            </div>
            <div class="workflow-method">
              <span class="workflow-step-icon"
                ><img src="/mark.svg" width="21" height="21" alt=""
              /></span>
              <div><strong>Map contact fields</strong><span>Call your reusable method</span></div>
              <span class="workflow-flow-label">FLOW</span>
            </div>
            <div>
              <span class="workflow-step-icon" aria-hidden="true">✓</span>
              <div>
                <strong>Prepare the review</strong
                ><span>Check the rows and pass the result on</span>
              </div>
            </div>
          </div>
          <div class="workflow-caption">One clear job. A useful next step.</div>
        </div>
      </div>
      <div
        class="story-panel"
        id="agent-story-panel"
        role="tabpanel"
        aria-labelledby="agent-story-tab"
        tabindex="0"
        hidden
      >
        <div class="story-copy">
          <span class="story-kicker">From instructions to a capability it can call</span>
          <h2>Give your agent<br />a specialist to call.</h2>
          <p>
            Let an agent call a method and work with its result. Keep the procedure in one place,
            ready for the next request.
          </p>
          <p class="story-payoff">
            Your app, workflow, and agent can build on the same useful method.
          </p>
          <a class="text-link" href="#hosts"
            >Find a host or add support <span aria-hidden="true">↓</span></a
          >
        </div>
        <div
          class="agent-product"
          role="img"
          aria-label="An agent receives a request to prepare contacts, calls a mapping method, and returns a reviewable preview."
        >
          <div class="mini-product-top">
            <span class="agent-symbol" aria-hidden="true">✧</span><strong>Your agent</strong
            ><span class="mini-product-dots" aria-hidden="true">•••</span>
          </div>
          <div class="agent-conversation">
            <div class="user-message">Prepare these contacts for review.</div>
            <div class="agent-tool">
              <img src="/mark.svg" width="21" height="21" alt="" />
              <div><strong>Map contact fields</strong><span>Calling a specialist method</span></div>
              <span aria-hidden="true">✓</span>
            </div>
            <div class="agent-message">
              <span class="agent-spark" aria-hidden="true">✧</span>
              <p>The contact preview is ready.<span>2 ready · 1 email to check</span></p>
            </div>
          </div>
          <div class="workflow-caption">Through a host with FLOW support.</div>
        </div>
      </div>
      <div class="story-controls" role="group" aria-label="Story navigation">
        <button
          class="story-arrow story-previous"
          type="button"
          data-story-step="-1"
          aria-label="Previous view"
          aria-controls="story-views"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button
        ><span class="story-position" id="story-position" aria-hidden="true">1 / 3</span
        ><button
          class="story-arrow story-next"
          type="button"
          data-story-step="1"
          aria-label="Next view"
          aria-controls="story-views"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button
        ><span
          class="sr-only"
          id="story-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        ></span>
      </div>
    </div>
  </section>

  <section class="qualities wrap benefits" aria-label="What this changes for you">
    <article>
      <span class="quality-symbol" aria-hidden="true"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01M10 15h6m-3-3 3 3-3 3" /></svg
      ></span>
      <h3>Put it in your product.</h3>
      <p>Let your application use the know-how that already helps your agent.</p>
    </article>
    <article>
      <span class="quality-symbol" aria-hidden="true"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 9a7 7 0 0 0-12-4L4 8m0-5v5h5M5 15a7 7 0 0 0 12 4l3-3m0 5v-5h-5" /></svg
      ></span>
      <h3>Start further along.</h3>
      <p>Reuse a useful method across projects, then improve it as you learn.</p>
    </article>
    <article>
      <span class="quality-symbol" aria-hidden="true"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="12" height="12" rx="2" />
          <path d="M9 19v2h12V9h-2M8 10l3-3m-3 0h3v3" /></svg
      ></span>
      <h3>Pass the method on.</h3>
      <p>Give another builder a method they can apply, evaluate, and build on.</p>
    </article>
  </section>

  <section
    class="comparison-section wrap"
    id="skills-comparison"
    aria-labelledby="comparison-title"
  >
    <div class="section-intro">
      <span class="section-tag">Why propose a successor?</span>
      <h2 id="comparison-title">
        Keep what made Skills useful.<br />Make the whole method callable.
      </h2>
      <p>
        <code>SKILL.md</code> made agent know-how easy to package and share.<br
          class="desktop-break"
        />
        FLOW proposes the next step: a common way for software to invoke, check, and combine that
        work.
      </p>
    </div>
    <div class="overview-frame">
      <table class="capability-table">
        <caption class="sr-only">
          Capabilities defined by the SKILL.md and FLOW standards. Included means specified by the
          standard; left to integrations means host-specific.
        </caption>
        <thead>
          <tr>
            <th scope="col">Built into the standard</th>
            <th scope="col">
              <span class="table-product-icon"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5M10 16h5" /></svg></span
              ><strong>SKILL.md</strong>
            </th>
            <th scope="col">
              <span class="table-product-icon"
                ><img src="/mark.svg" width="29" height="29" alt="" /></span
              ><strong>FLOW</strong><small>The successor proposal</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5M10 16h5" /></svg
                >Readable instructions</span
              >
            </th>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 7h7l2 3h9v10H3zM3 7V4h7l2 3h6v3" /></svg
                >Bundled resources &amp; code</span
              >
            </th>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h16m-5-5 5 5-5 5M4 6V3h4M4 18v3h4" /></svg
                >Shared invocation interface</span
              >
            </th>
            <td>
              <span class="capability-state integration"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
                ><span class="sr-only">Left to integrations</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="3" width="16" height="18" rx="3" />
                  <path d="m8 12 3 3 5-6" /></svg
                >Defined inputs &amp; results</span
              >
            </th>
            <td>
              <span class="capability-state integration"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
                ><span class="sr-only">Left to integrations</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" /></svg
                >Code, agents, prompts — one interface</span
              >
            </th>
            <td>
              <span class="capability-state integration"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
                ><span class="sr-only">Left to integrations</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <path d="M14 17.5h7m-3.5-3.5v7" /></svg
                >Declared method calls</span
              >
            </th>
            <td>
              <span class="capability-state integration"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
                ><span class="sr-only">Left to integrations</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="8" y="8" width="8" height="8" rx="2" />
                  <path
                    d="M12 2v6m0 8v6M2 12h6m8 0h6M10 4l2-2 2 2m-4 16 2 2 2-2M4 10l-2 2 2 2m16-4 2 2-2 2"
                  /></svg
                >Live message channels</span
              >
            </th>
            <td>
              <span class="capability-state integration"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
                ><span class="sr-only">Left to integrations</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span class="capability-name"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12l-2 2 2 2m5-4 2 2-2 2" /></svg
                >Optional schema contracts</span
              >
            </th>
            <td>
              <span class="capability-state integration"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
                ><span class="sr-only">Left to integrations</span></span
              >
            </td>
            <td>
              <span class="capability-state"
                ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
                ><span class="sr-only">Included in the standard</span></span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="comparison-legend" aria-hidden="true">
      <span
        ><span class="capability-state"
          ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 6 2 2 4-4" /></svg
          ><span class="sr-only">Included in the standard</span></span
        >
        Included in the standard</span
      ><span
        ><span class="capability-state integration"
          ><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6" /></svg
          ><span class="sr-only">Left to integrations</span></span
        >
        Left to integrations</span
      >
    </div>
    <p class="comparison-note">
      Existing Skills may need adaptation. FLOW requires a compatible host.
      <a href="/guide/skills">Check compatibility <span aria-hidden="true">↗</span></a>
    </p>
  </section>

  <section class="possibilities wrap" id="possibilities" aria-labelledby="possibilities-title">
    <div class="section-intro">
      <span class="section-tag">What makes this possible</span>
      <h2 id="possibilities-title">One shared boundary.<br />More ways to build on your work.</h2>
      <p>
        Once a method has a common calling interface, you can choose how it works, combine it with
        specialists, and evolve it while keeping the calling model consistent.
      </p>
    </div>
    <div class="feature-grid">
      <article class="feature-card readable">
        <div class="feature-copy">
          <span class="feature-icon" aria-hidden="true"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5M10 16h5" /></svg></span
          ><span class="feature-label">Readable by design</span>
          <h3>Start with a file.<br />Grow it when you need to.</h3>
          <p>
            Keep instructions in a readable <code>FLOW.md</code>. Add resources or optional
            contracts as the method grows.
          </p>
          <a class="text-link" href="/guide/skills"
            >From SKILL.md to FLOW <span aria-hidden="true">↗</span></a
          >
        </div>
        <div
          class="feature-art"
          role="img"
          aria-label="A readable FLOW.md document, with resources behind it."
        >
          <svg viewBox="0 0 440 250" aria-hidden="true">
            <g transform="rotate(-6 220 130)">
              <rect x="133" y="26" width="190" height="224" rx="12" fill="#dcefe2" />
              <rect x="125" y="33" width="190" height="224" rx="12" fill="#edf7f0" />
              <path
                class="art-paper"
                d="M130 40h127l42 42v176H130a12 12 0 0 1-12-12V52a12 12 0 0 1 12-12Z"
              />
              <path d="M257 40v31a11 11 0 0 0 11 11h31" fill="#f1f8f3" stroke="#dce8df" />
              <text class="art-title" x="144" y="116">FLOW.md</text>
              <rect class="art-tint" x="144" y="140" width="127" height="7" rx="3.5" />
              <rect class="art-muted" x="144" y="160" width="111" height="6" rx="3" />
              <rect class="art-muted" x="144" y="178" width="128" height="6" rx="3" />
              <rect class="art-muted" x="144" y="196" width="87" height="6" rx="3" />
            </g>
            <circle cx="305" cy="200" r="24" fill="#fff" stroke="#e3ece5" />
            <circle class="art-tint" cx="305" cy="200" r="18" />
            <path class="art-icon" d="m297 200 5 5 10-11" />
          </svg>
        </div>
      </article>
      <article class="feature-card flexible">
        <div class="feature-copy">
          <span class="feature-icon" aria-hidden="true"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" /></svg></span
          ><span class="feature-label">Code, agents, prompts</span>
          <h3>Choose how.<br />Keep the same call.</h3>
          <p>
            Use code, prompt instructions, or agents. Your application calls each through the same
            interface.
          </p>
          <a class="text-link" href="/guide/understand"
            >Explore the common interface <span aria-hidden="true">↗</span></a
          >
        </div>
        <div
          class="feature-art"
          role="img"
          aria-label="Code, agent and hybrid methods share one calling interface."
        >
          <svg viewBox="0 0 440 250" aria-hidden="true">
            <path class="art-line-colour" d="M89 89V62h262v27M220 62V42" />
            <circle class="art-bright" cx="220" cy="42" r="4" />
            <g transform="rotate(-5 92 140)">
              <rect class="art-paper" x="43" y="89" width="99" height="109" rx="17" />
              <path class="art-icon" d="m82 118-11 12 11 12m22-24 11 12-11 12" />
              <text class="art-caption" x="92" y="175">Code</text>
            </g>
            <rect class="art-paper" x="171" y="84" width="99" height="109" rx="17" />
            <path class="art-icon" d="m220 109 5 15 15 5-15 5-5 15-5-15-15-5 15-5z" />
            <text class="art-caption" x="220" y="171">Agent</text>
            <g transform="rotate(5 350 140)">
              <rect class="art-paper" x="299" y="89" width="99" height="109" rx="17" />
              <path
                class="art-icon"
                d="M332 118c-7 0-3 12-9 12 6 0 2 12 9 12m37-24c7 0 3 12 9 12-6 0-2 12-9 12m-19-24 3 9 9 3-9 3-3 9-3-9-9-3 9-3z"
              />
              <text class="art-caption" x="349" y="175">Both</text>
            </g>
            <path d="M172 221h96" stroke="#dfe8fb" stroke-width="5" stroke-linecap="round" />
          </svg>
        </div>
      </article>
      <article class="feature-card composable">
        <div class="feature-copy">
          <span class="feature-icon" aria-hidden="true"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
              <path d="M14 17.5h7m-3.5-3.5v7" /></svg></span
          ><span class="feature-label">Built to compose</span>
          <h3>Small pieces.<br />Bigger possibilities.</h3>
          <p>
            Give each method one clear job. Combine specialists into a capability you can understand
            and improve.
          </p>
          <a class="text-link" href="/guide/understand#let-capability-build-on-capability"
            >See how capability compounds <span aria-hidden="true">↗</span></a
          >
        </div>
        <div
          class="feature-art"
          role="img"
          aria-label="Three small methods combine into a new capability."
        >
          <svg viewBox="0 0 440 250" aria-hidden="true">
            <path class="art-line-colour" d="M103 90v30h234V90M220 120v32" />
            <rect class="art-paper" x="69" y="25" width="68" height="68" rx="15" />
            <path class="art-icon" d="m95 49-8 10 8 10m17-20 8 10-8 10" />
            <rect class="art-paper" x="186" y="25" width="68" height="68" rx="15" />
            <path class="art-icon" d="m220 41 4 13 13 5-13 4-4 13-4-13-13-4 13-5z" />
            <rect class="art-paper" x="303" y="25" width="68" height="68" rx="15" />
            <path class="art-icon" d="m326 59 8 8 15-18" />
            <rect x="117" y="151" width="206" height="75" rx="16" fill="#fff" stroke="#e6d7ba" />
            <rect class="art-tint" x="130" y="164" width="49" height="49" rx="11" />
            <path
              class="art-small-icon"
              d="M143 177h8v8h-8zm12 0h8v8h-8zm-12 12h8v8h-8zm12 4h8m-4-4v8"
            />
            <text class="art-caption" x="252" y="193" style="fill: #715a33">A new capability</text>
          </svg>
        </div>
      </article>
      <article class="feature-card connected">
        <div class="feature-copy">
          <span class="feature-icon" aria-hidden="true"
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="8" y="8" width="8" height="8" rx="2" />
              <path
                d="M12 2v6m0 8v6M2 12h6m8 0h6M10 4l2-2 2 2m-4 16 2 2 2-2M4 10l-2 2 2 2m16-4 2 2-2 2"
              /></svg></span
          ><span class="feature-label">Connected as it runs</span>
          <h3>A result at the end.<br />A conversation along the way.</h3>
          <p>
            Return an outcome and output. Exchange live messages while the work runs, through
            explicit channels.
          </p>
          <a class="text-link" href="/spec/channel-contracts"
            >Explore channels <span aria-hidden="true">↗</span></a
          >
        </div>
        <div
          class="feature-art"
          role="img"
          aria-label="Input and result connect vertically; live messages connect horizontally."
        >
          <svg viewBox="0 0 440 250" aria-hidden="true">
            <path class="art-invoke" d="M220 45v46m0 69v46" />
            <path class="art-invoke" d="m216 83 4 5 4-5m-8 115 4 5 4-5" />
            <path class="art-line-colour" d="M83 125h97m80 0h97" stroke-dasharray="3 6" />
            <text class="art-caption" x="220" y="30">Input</text>
            <text class="art-caption" x="220" y="231">Result</text>
            <rect class="art-paper" x="181" y="86" width="78" height="78" rx="18" />
            <image href="/mark.svg" x="199" y="104" width="42" height="42" />
            <circle class="art-tint" cx="78" cy="125" r="24" />
            <path class="art-small-icon" d="M68 117h20v13H77l-6 5v-5h-3z" />
            <circle class="art-tint" cx="362" cy="125" r="24" />
            <path class="art-small-icon" d="M352 117h20v13h-11l-6 5v-5h-3z" />
            <circle class="art-bright" cx="139" cy="125" r="4" />
            <circle class="art-bright" cx="301" cy="125" r="4" />
          </svg>
        </div>
      </article>
    </div>
  </section>

  <section class="runtime-section wrap" aria-labelledby="runtime-title">
    <div class="runtime-copy">
      <span class="section-tag">Runtime agnostic by design</span>
      <h2 id="runtime-title">Your method.<br />Your runtime.</h2>
      <p>
        Every <code>FLOW.&lt;ext&gt;</code> meets the same interface. Bring the language or runtime
        your method needs.
      </p>
      <p class="runtime-principle">
        The extension is open. FLOW treats them equally.<br />Each host chooses what it can run.
      </p>
      <a class="text-link" href="/guide/runtimes"
        >Explore the runtime model <span aria-hidden="true">↗</span></a
      >
    </div>
    <div
      class="runtime-visual"
      role="img"
      aria-label="FLOW.md, FLOW.py, FLOW.ts and any host-supported FLOW extension meet the same FLOW interface."
    >
      <div class="runtime-files">
        <span
          ><img
            class="runtime-brand runtime-markdown"
            src="/home/assets/brands/markdown.svg"
            width="35"
            height="35"
            alt="Markdown"
          /><code>FLOW.md</code></span
        ><span
          ><img
            class="runtime-brand"
            src="/home/assets/brands/python.svg"
            width="35"
            height="35"
            alt="Python"
          /><code>FLOW.py</code></span
        ><span
          ><img
            class="runtime-brand"
            src="/home/assets/brands/typescript.svg"
            width="35"
            height="35"
            alt="TypeScript"
          /><code>FLOW.ts</code></span
        ><span><b class="runtime-any" aria-hidden="true">…</b><code>FLOW.&lt;ext&gt;</code></span>
      </div>
      <div class="runtime-connection" aria-hidden="true"></div>
      <div class="runtime-boundary">
        <img src="/mark.svg" width="24" height="24" alt="" /><span>One shared FLOW interface</span>
      </div>
      <p>Equal at the boundary.<br />Free to work differently inside.</p>
    </div>
  </section>

  <section class="simple-proof wrap" id="showcase" aria-labelledby="proof-title">
    <div class="section-intro">
      <span class="section-tag">One interface, different implementations</span>
      <h2 id="proof-title">A customer request in.<br />A checked decision out.</h2>
      <p>
        A FLOW can run code, agent instructions, or both.<br class="desktop-break" />
        Here, an agent interprets the request and code checks the records and credit policy.
      </p>
    </div>
    <div class="case-example">
      <div class="case-input">
        <span class="case-label">The customer’s request</span>
        <blockquote>“I was charged twice.<br />Please credit the second payment.”</blockquote>
        <div class="case-records">
          <span class="case-records-label">Two payments · same invoice</span>
          <div>
            <span><i></i><strong>ch-101</strong><small>Settled</small></span
            ><b>USD 24.00</b>
          </div>
          <div>
            <span><i></i><strong>ch-102</strong><small>Settled</small></span
            ><b>USD 24.00</b>
          </div>
        </div>
      </div>
      <div class="case-method">
        <div class="case-method-line" aria-hidden="true"></div>
        <img src="/mark.svg" width="27" height="27" alt="" /><strong
          >Interpret the request.<br />Check the records.</strong
        ><span class="case-implementation-cue"
          >Code · Instructions · Both<br /><span>One interface for your app.</span></span
        >
        <div class="case-method-line" aria-hidden="true"></div>
      </div>
      <div class="case-result">
        <span class="case-label">The result your app can use</span
        ><span class="case-outcome"
          ><svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8" />
            <path d="m6 10 3 3 5-6" /></svg
          >Credit eligible</span
        ><strong class="case-amount"><span>USD</span> 24.00</strong>
        <div class="case-checks">
          <span><i aria-hidden="true">✓</i> Duplicate payment verified</span
          ><span><i aria-hidden="true">✓</i> Within the credit policy</span>
        </div>
        <p>A decision, ready for your application.<br />No credit has been issued.</p>
      </div>
      <div class="case-footer">
        <a href="https://jig.md/guide/support-case"
          >Explore the working example in Jig <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
  </section>

  <section class="getting-started wrap" aria-labelledby="getting-started-title">
    <div class="section-intro">
      <span class="section-tag">Your next step</span>
      <h2 id="getting-started-title">Start with a Skill<br />you already find useful.</h2>
      <p>
        Choose a method whose value you understand.<br class="desktop-break" />
        Give it a clear input and result, then put it to work in a compatible host.
      </p>
    </div>
    <div class="start-steps">
      <article>
        <span class="start-number">01</span>
        <h3>Bring the know-how.</h3>
        <p>
          Review what your Skill needs. Adapt it into a <code>FLOW.md</code>, or choose code when
          the procedure calls for it.
        </p>
        <a href="/guide/skills">Bring a Skill to FLOW <span aria-hidden="true">↗</span></a>
      </article>
      <article>
        <span class="start-number">02</span>
        <h3>Put it to work.</h3>
        <p>
          Use a compatible host. It supplies the execution, tools, providers, and policy your method
          needs.
        </p>
        <a href="https://jig.md/"
          >Explore Jig, the first FLOW host <span aria-hidden="true">↗</span></a
        >
      </article>
      <article>
        <span class="start-number">03</span>
        <h3>Build on it.</h3>
        <p>
          Call other methods. Add optional contracts when collaborators need exact inputs, results,
          or channels.
        </p>
        <a href="/guide/platforms">Build a host or integration <span aria-hidden="true">↗</span></a>
      </article>
    </div>
  </section>

  <section class="hosts-section host-ecosystem wrap" id="hosts" aria-labelledby="hosts-title">
    <div class="section-intro">
      <span class="section-tag">Where FLOW runs</span>
      <h2 id="hosts-title">Try FLOW today.<br />On a host that supports it.</h2>
      <p>
        Jig is the first host to implement FLOW.<br class="desktop-break" />
        Run your methods there, or help bring FLOW to the tools you use.
      </p>
    </div>
    <div class="supported-hosts">
      <span class="host-availability">Available now</span
      ><a class="jig-logo-link" href="https://jig.md/" aria-label="Explore Jig, the first FLOW host"
        ><img src="/home/assets/brands/jig.svg" width="166" height="72" alt="Jig"
      /></a>
      <p>Jig runs your FLOW methods.</p>
      <div
        class="supported-runtime-footer"
        aria-label="Jig supports Markdown and TypeScript through Bun"
      >
        <span
          ><img
            src="/home/assets/brands/markdown.svg"
            alt=""
            width="19"
            height="19"
          />Markdown</span
        ><span
          ><img src="/home/assets/brands/typescript.svg" alt="" width="17" height="17" />TypeScript
          <small>(Bun)</small></span
        >
      </div>
      <a class="button primary host-try-button" href="https://jig.md/guide/"
        >Try FLOW with Jig <span aria-hidden="true">↗</span></a
      >
    </div>
    <div class="contribute-hosts" aria-labelledby="contribute-hosts-title">
      <span class="host-contribution-label">Help grow the ecosystem</span>
      <h3 id="contribute-hosts-title">Bring FLOW to your coding agent.</h3>
      <p>Add support with a pull request to one of these projects.</p>
      <div class="agent-logo-wall">
        <a
          class="agent-logo-link agent-codex"
          href="https://github.com/openai/codex/compare?expand=1"
          aria-label="Contribute FLOW support to Codex: open a new pull request"
          title="Contribute FLOW support to Codex"
          ><img src="/home/assets/brands/codex.svg" alt="" width="36" height="36" /><span
            >Codex</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link agent-claude-code"
          href="https://github.com/anthropics/claude-code/compare?expand=1"
          aria-label="Contribute FLOW support to Claude Code: open a new pull request"
          title="Contribute FLOW support to Claude Code"
          ><img src="/home/assets/brands/claude-code.svg" alt="" width="102" height="28" /><span
            >Code</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link agent-pi"
          href="https://github.com/earendil-works/pi/compare?expand=1"
          aria-label="Contribute FLOW support to pi: open a new pull request"
          title="Contribute FLOW support to pi"
          ><img src="/home/assets/brands/pi.svg" alt="" width="36" height="36" /><span>pi</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link wordmark-only agent-opencode"
          href="https://github.com/anomalyco/opencode/compare?expand=1"
          aria-label="Contribute FLOW support to OpenCode: open a new pull request"
          title="Contribute FLOW support to OpenCode"
          ><img src="/home/assets/brands/opencode.svg" alt="" width="36" height="36" /><span
            class="sr-only"
            >OpenCode</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link agent-gemini-cli"
          href="https://github.com/google-gemini/gemini-cli/compare?expand=1"
          aria-label="Contribute FLOW support to Gemini CLI: open a new pull request"
          title="Contribute FLOW support to Gemini CLI"
          ><img src="/home/assets/brands/gemini-cli.png" alt="" width="36" height="36" /><span
            >Gemini CLI</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link agent-cline"
          href="https://github.com/cline/cline/compare?expand=1"
          aria-label="Contribute FLOW support to Cline: open a new pull request"
          title="Contribute FLOW support to Cline"
          ><img src="/home/assets/brands/cline.svg" alt="" width="36" height="36" /><span
            >Cline</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link agent-goose"
          href="https://github.com/aaif-goose/goose/compare?expand=1"
          aria-label="Contribute FLOW support to Goose: open a new pull request"
          title="Contribute FLOW support to Goose"
          ><img src="/home/assets/brands/goose.svg" alt="" width="36" height="36" /><span
            >Goose</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
        <a
          class="agent-logo-link wordmark-only agent-aider"
          href="https://github.com/Aider-AI/aider/compare?expand=1"
          aria-label="Contribute FLOW support to Aider: open a new pull request"
          title="Contribute FLOW support to Aider"
          ><img src="/home/assets/brands/aider.svg" alt="" width="132" height="40" /><span
            class="sr-only"
            >Aider</span
          ><svg class="agent-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" /></svg
        ></a>
      </div>
      <a class="host-integration-link" href="/guide/platforms"
        >Build an integration with the host guide <span aria-hidden="true">↗</span></a
      >
    </div>
  </section>

  <section class="faq wrap" aria-labelledby="faq-title">
    <div class="section-intro">
      <span class="section-tag">A few useful details</span>
      <h2 id="faq-title">Small standard. Fair questions.</h2>
    </div>
    <div class="faq-items">
      <details>
        <summary>Can I bring an existing SKILL.md?<span aria-hidden="true">+</span></summary>
        <p>
          Simple instruction-based Skills can become Markdown Flows when their package and
          requirements fit the runtime. Scripts, tools, resources, and session assumptions may need
          adaptation. <a href="/guide/skills">Read the compatibility guide ↗</a>
        </p>
      </details>
      <details>
        <summary>Does FLOW choose my framework or model?<span aria-hidden="true">+</span></summary>
        <p>
          Your method owns its procedure and internal orchestration. A compatible host supplies
          runtime support, providers, credentials, powers, and policy. FLOW defines the shared
          package and invocation boundary. <a href="/guide/concepts">Explore the concepts ↗</a>
        </p>
      </details>
      <details>
        <summary>
          Do I need a formal contract for every method?<span aria-hidden="true">+</span>
        </summary>
        <p>
          No. Start with the ordinary input/result boundary. Add an optional
          <code>FLOW.contract.json</code> for validation, outcomes, or channel ports. Named
          contracts earn their place when independently maintained collaborators need an exact
          interface. <a href="/spec/invocation-contracts">Read about contracts ↗</a>
        </p>
      </details>
      <details>
        <summary>Can I use FLOW today?<span aria-hidden="true">+</span></summary>
        <p>
          FLOW is in public alpha. Specifications and SDKs may evolve. Jig is the first supporting
          host. FLOW is runtime agnostic; each host determines which implementations it can execute.
          <a href="/guide/runtimes">Check runtime support ↗</a>
        </p>
      </details>
    </div>
  </section>

  <section class="closing">
    <div class="closing-sky" aria-hidden="true"></div>
    <div class="closing-content wrap">
      <img src="/mark.svg" width="55" height="55" alt="" />
      <h2>Your next project<br />can start ahead.</h2>
      <p>Build on a method you already use.<br />Give the next builder something to build on.</p>
      <div class="actions">
        <a class="button primary" href="/guide/skills"
          >Bring a Skill to FLOW <span aria-hidden="true">↗</span></a
        ><a class="button secondary" href="https://github.com/jiggy/flow"
          >Build with us on GitHub <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
  </section>
</main>
<footer class="footer wrap">
  <div class="footer-main">
    <div class="footer-about">
      <a class="wordmark" href="#" aria-label="FLOW home"
        ><img src="/mark.svg" width="30" height="30" alt="" /><span>FLOW</span></a
      >
      <p>Executable know-how.<br />Capability worth sharing.</p>
      <span class="alpha-note"><i></i> Open standard · Public alpha</span>
    </div>
    <div class="footer-links">
      <div>
        <h3>Build</h3>
        <a href="/guide/start">Get started</a><a href="/guide/skills">Bring a Skill</a
        ><a href="/guide/platforms">Build a host</a>
      </div>
      <div>
        <h3>Explore</h3>
        <a href="/guide/overview">Documentation</a><a href="/guide/">Specifications</a
        ><a href="/guide/for-agents">For agents</a>
      </div>
      <div>
        <h3>Open by design</h3>
        <a href="https://github.com/jiggy/flow">GitHub</a
        ><a href="https://github.com/jiggy/flow/blob/main/Governance.md">Governance</a
        ><a href="https://github.com/jiggy/flow/blob/main/LICENSES.md">Licenses</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom"><span>Small methods. Bigger possibilities.</span></div>
</footer>
