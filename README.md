# Huzaifa Imran — Developer Portfolio

A dynamic, high-performance portfolio highlighting architectural logic, seamless animations, and AI-driven interactions. Built for speed, scale, and modern aesthetics using the latest Next.js 16.2 App Router.

## 🚀 Built With

- **Framework:** [Next.js 16.2](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Modules
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend/DB:** [Supabase](https://supabase.com/) & [Upstash Redis](https://upstash.com/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai`)
- **Content:** MDX (`next-mdx-remote`)

## 💡 Key Features

- **Kinetic Typography & Alchemical UI:** A high-end "Obsidian Forge" design transformation featuring bold architectural structuring and interactive UI shards dynamically reacting to cursor movements.
- **RAG-Powered AI Chatbot:** An integrated AI assistant trained directly on my resume and portfolio context using a local vector store and generative AI models. Can accurately answer recruiter questions regarding my tech stack, workflow, and availability.
- **Live GitHub Activity:** Fetches real-time commits and contribution data natively from the GitHub GraphQL API.
- **Performance Optimized:** Advanced caching architectures in use with Upstash Redis and server-side logic in Next.js to ensure extremely fast page-load and snappy transitions. 
- **Dynamic Content & View Counters:** Blog routing powered by pure MDX files complete with dynamic view counters.
  
## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Set up your `.env.local` to include your Supabase, Upstash Redis, GitHub, and Gemini API keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
GITHUB_TOKEN=...
GEMINI_API_KEY=...
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Repository Structure

- `/app`: Next.js App Router (pages and API endpoints).
- `/components`: Modular React components grouped by functionality (e.g., `chat`, `blog`, `github`, `layout`).
- `/lib` & `/hooks`: Shared utility logic and custom React hooks.
- `/content`: Local markdown/MDX files for the blog or project directories.

## 📧 Contact

**Huzaifa Imran** — Full-Stack Engineer & AI Builder.
- Email: [sungpog89@gmail.com](mailto:sungpog89@gmail.com)
- GitHub: [@Huzaifa-12Imran](https://github.com/Huzaifa-12Imran)
