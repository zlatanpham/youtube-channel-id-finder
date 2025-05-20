# Project Configuration: T3 Stack with Prisma, Next-Auth, Shadcn UI

## Tech Stack

- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- API Layer: NextJS
- UI Components: Shadcn UI
- Styling: Tailwind CSS
- Deployment: Vercel
- Version Control: Git (GitHub)

## Project Structure (Typical T3 Layout)

```
.
├── .github/              # GitHub Actions/workflows (optional)
├── .vscode/              # VSCode settings (optional)
├── public/               # Static assets (images, fonts, favicon)
├── src/
│   ├── app/              # Next.js App Router: pages, layouts, API routes, loading states
│   ├── components/       # Reusable React components
│   │   └── ui/           # Shadcn UI components (added via CLI)
│   ├── env.mjs           # Environment variable validation (T3 specific)
│   ├── styles/           # Global CSS styles
│   │   └── globals.css
│   └── types/            # Shared TypeScript types and interfaces (optional)
├── .env                  # Local environment variables (MUST be gitignored)
├── .env.example          # Example environment variables
├── .eslintrc.cjs         # ESLint configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.cjs    # PostCSS configuration (for Tailwind)
├── prettier.config.cjs   # Prettier configuration (optional)
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

_Note: File extensions (.js, .mjs, .cjs, .ts) might vary slightly based on project setup choices._

## Development Workflow

- Cline helps write and review code changes
- Vercel automatically deploys from main branch

## Security

DO NOT read or modify:

- .env files
- \*_/config/secrets._
- Any file containing API keys or credentials
