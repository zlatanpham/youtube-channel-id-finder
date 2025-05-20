# Coding Standards: T3 Stack (Next.js, tRPC, Prisma, Tailwind, Next-Auth, Shadcn)

## Objective

- Deliver typesafe, performant, and maintainable Next.js applications using the T3 stack principles.
- Prioritize developer experience, end-to-end typesafety, and clean architecture.

## Code Style

- Use modern TypeScript with functional patterns; leverage inference.
- Name variables and functions descriptively (e.g., `isLoadingUser`, `getUserById`).
- Organize files logically within `app`, `components`
- Use lowercase-kebab-case for directory and file names (e.g., `components/user-profile`, `lib/utils.ts`).

## Optimization & Performance

- Maximize React Server Components (RSCs); minimize `'use client'`.
- Leverage tRPC for typesafe data fetching/mutations and batching.
- Optimize Prisma queries (select specific fields, use transactions appropriately).
- Use Next.js `dynamic` imports for code splitting.
- Design mobile-first, responsive UIs with Tailwind.
- Optimize images (Next.js `<Image>`, modern formats like WebP).

## Error Handling & Validation

- Use Zod for robust schema validation (env vars via `env.mjs`, tRPC inputs/outputs, forms).
- Handle errors gracefully in tRPC procedures and UI components.
- Use guard clauses and early returns for clarity.

## UI & Styling

- Utilize Shadcn UI components built on Radix UI and Tailwind CSS. Add components using `pnpm ui:add -- [component]`.
- Maintain consistency using Tailwind utility classes and `tailwind.config.ts`.
- Ensure accessibility and responsive design across devices.

## Form Handling

- Use React Hook Form for form state management and validation.
- Integrate Zod for schema validation with React Hook Form.
- Use Shadcn UI components for form elements (e.g.,form, inputs, buttons) to ensure consistent styling and behavior.
