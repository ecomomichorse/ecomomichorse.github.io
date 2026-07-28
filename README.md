# i-blog-template

A ready-to-use blog/website template. It's built so a **non-technical client** can get their own copy of this site live on the internet by doing nothing more than **logging in and clicking a button** — no installing software, no command line, no Git.

> **Maintainers: read "Before you use this as a template" near the bottom first.** A few placeholders need to be filled in once, after which this repo can be reused for unlimited clients.

---

## 1. What this is

- A fast, SEO-friendly blog built with Next.js.
- Content (blog posts, About page, Privacy Policy, site name/description) is edited through **Pages CMS** — a free visual editor that saves changes straight into this GitHub repository. No database, no code editing required to publish content.
- Built-in blog, tag/category browsing, on-site search, light/dark theme, and a cookie-consent banner for analytics.
- Designed to be **cloned once per client**: every client gets their own copy of this repository and their own Vercel deployment.

---

## 2. Local development (for developers)

You only need this section if you're doing code-level customization. Clients never need to do this.

```bash
pnpm install
pnpm dev
```

This starts two processes together: `velite` (which watches `content/*.mdx` and rebuilds the generated content data) and `next dev` (the website). Open http://localhost:3000.

To produce a production build locally:

```bash
pnpm build
pnpm start
```

Environment variables (all optional — see `.env.example`):

| Variable | Purpose | If unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in the sitemap, SEO tags, and JSON-LD | Defaults to `http://localhost:3000` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID | Analytics simply stays off |
| `NEXT_PUBLIC_CONTACT_FORM_URL` | Where the "Contact" page's button links to (e.g. a Google Form) | Defaults to a placeholder URL |

Copy `.env.example` to `.env.local` and fill in real values when you have them.

---

## 3. Editing content with Pages CMS

[Pages CMS](https://pagescms.org) is a free, visual, no-code editor that reads and writes directly to this GitHub repository — so "editing the website" is really just "editing files in GitHub," but through a friendly form-based interface instead of code.

This repo already includes a `.pages.yml` configuration file, so Pages CMS knows exactly what can be edited:

- **文章 (Blog posts)** — title, excerpt, cover image, date, tags, categories, draft toggle, and the article body (rich text).
- **關於頁面 (About page)** and **隱私權政策 (Privacy Policy)** — title and rich-text body.
- **網站設定 (Site settings)** — site name, description, author name/bio, and social media links (`data/site.json`).

### One-time setup (done once per repository, by whoever manages content)

1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Authorize the "Pages CMS" GitHub App for **this specific repository** (or for your whole account, if you'll manage many sites this way).
3. Pages CMS will detect the `.pages.yml` file automatically and show the collections listed above.

### Day-to-day usage

1. Sign in at https://app.pagescms.org.
2. Pick a collection (e.g. "文章").
3. Edit the fields, then click **Save** — Pages CMS commits the change straight to the repository.
4. Vercel automatically rebuilds and redeploys the live site within a minute or two of the save. No further action needed.

> **Note:** Pages CMS access must be granted separately from the "Deploy to Vercel" flow below — it's a one-time authorization step, not something a button can fully automate. See the Troubleshooting section if collections don't appear.

---

## 4. Deploying — the client's experience

This is the entire client-facing flow. It assumes the client has already been invited as a collaborator on this repository (see "Client onboarding" below for the full picture).

**What the client needs:**
- A GitHub account (free) — https://github.com/signup
- A Vercel account (free) — can sign up using the same GitHub account in the same step

**Steps:**

1. **Accept the GitHub invitation** you sent them (arrives by email or as a GitHub notification).
2. Click the button below.

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/InkyChew/i-blog-template&repository-name=my-blog)

3. Vercel will ask them to **log in / sign up** (the "Continue with GitHub" option is easiest).
4. Vercel will ask for permission to access GitHub — click **Authorize**.
5. Vercel shows a screen to name the new project — the client can leave the suggested name or change it, then click **Create**.
6. Vercel automatically:
   - Creates a **brand-new GitHub repository** in the client's own account (a copy of this template — the original template is untouched).
   - Deploys that new repository as a **new Vercel project**.
7. After a minute or two, Vercel shows "Congratulations!" with a link to the live site.

That's it — no Git commands, no terminal, no code.

---

## 5. Client onboarding guide (for you, the site builder)

This is the intended end-to-end workflow for turning this template into a specific client's live site:

1. **You** create this repository as a **private GitHub Template Repository** (see "Before you use this as a template" below).
2. **You** invite the client as a temporary collaborator on this repo (GitHub → Settings → Collaborators → Add people).
3. **The client** accepts the GitHub invitation (check email / GitHub notifications).
4. **The client** clicks the "Deploy to Vercel" button in this README and follows the 5 steps in section 4 above.
5. A new GitHub repository and a new Vercel deployment now exist under the **client's own accounts**.
6. **The client** invites you as a collaborator on their new GitHub repository (GitHub → their new repo → Settings → Collaborators).
7. *(Optional, only if you'll manage deployments/domains for them)* **The client** also invites you to their Vercel project (Vercel → Project → Settings → Members).
8. Once you have access to the client's repository, **you** remove the client's access to this original template repo (so it stays clean for the next client).
9. **You** clone the client's repository locally and do any further customization (branding, domain setup, etc.).
10. **You** (or the client, once trained) use Pages CMS — see section 3 — to keep the content updated going forward.

### Manual vs. automated, at a glance

| Task | Who does it |
|---|---|
| Create the template repo, mark it as a GitHub Template, keep it private | You (manual, one-time) |
| Invite / remove client collaborator access | You (manual) |
| Accept invite, click Deploy, name the project | Client (a few clicks) |
| New repo + new Vercel project creation | Automatic |
| Invite you to their new repo/project | Client (a few clicks) |
| Install the Pages CMS GitHub App on the new repo | You or the client (manual, one-time — cannot be automated by the Deploy button) |
| Ongoing content edits | Client, via Pages CMS |

---

## 6. Troubleshooting

**"The Deploy button gives a 404 or can't find the repository."**
The template repository is private. Make sure the person clicking the button has already accepted their collaborator invitation on GitHub *before* clicking Deploy, and that they authorize Vercel's GitHub App to access the repository when prompted.

**"Pages CMS shows no collections / can't find the repo."**
The Pages CMS GitHub App needs to be authorized for that specific repository. Go to https://app.pagescms.org, sign out and back in if needed, and check that the GitHub App's installation includes the repository (GitHub → Settings → Applications → Pages CMS → Configure).

**"I edited content in Pages CMS but the live site didn't change."**
Vercel redeploys automatically after every commit, but it takes a minute or two. Check the "Deployments" tab in the Vercel dashboard for the project — if a deployment shows an error, click into it to see the build log.

**"The blog post I saved doesn't show up on the site."**
Check the "draft" checkbox for that post in Pages CMS — draft posts don't appear on the public site. Also check the publish date isn't set in the future.

**"I don't see a way to change the site's domain, analytics, etc."**
Those are managed in the Vercel dashboard (Project → Settings → Domains, and Project → Settings → Environment Variables), not through Pages CMS, since they involve deployment configuration rather than content.

---

## Before you use this as a template

A few things need to be set once, by you, before inviting the first client:

1. **Push this project to a new GitHub repository** named `i-blog-template` (or any name you prefer).
2. In GitHub → **Settings → General → Template repository**, check the box to mark it as a template. Keep visibility **private**.
3. Replace `YOUR_GITHUB_USERNAME` in the Deploy button URL above (section 4) with your actual GitHub username or organization name, matching the repo you just created.
4. Double-check `.env.example`, `data/site.json`, and the sample blog post are all still generic placeholders — nothing client-specific should ever live in this template repo, since it's reused for every client.

Nothing in this repository is hardcoded to a specific client, domain, or set of credentials — every client-specific detail (site name, description, content, domain, analytics ID) is filled in independently after their own repository is created from this template.
