# Mini Dashboard app

In this project, we explore the differences between server-side and client-side code.

## Image management

We use Next image management for performance optimization. Learn more [here](https://nextjs.org/docs/app/api-reference/components/image)

Edit `next.config.ts` for images

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
```

Then, use the Image component, making sure to include all required props.

```html
<image
  className="rounded-full w-8 h-8"
  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
  alt="user avatar"
  width="{50}"
  height="{50}"
/>
```

## Config Eslint and Prettier with Google code styles - Use in all projects

1. Install dependencies

   ```bash
   npm i -D eslint-config-google eslint-plugin-prettier prettier eslint-config-prettier
   ```

2. ESLint config: `eslint.config.mjs`

   ```typescript
   import { FlatCompat } from '@eslint/eslintrc';

   import { dirname } from 'path';
   import { fileURLToPath } from 'url';

   const __filename = fileURLToPath(import.meta.url);
   const__dirname = dirname(__filename);

   const compat = new FlatCompat({
     baseDirectory: __dirname,
   });

   const eslintConfig = [
     ...compat.extends(
       'next/core-web-vitals',
       'next/typescript',
       'google', // Google code styles
       'plugin:prettier/recommended' // recommended prettier
     ),
     {
       rules: {
         // ESLint custom rules here (if needed)
       },
     },
   ];

   export default eslintConfig;
   ```

3. Prettier config `.prettierrc.json`

   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "tabWidth": 2,
     "singleQuote": true,
     "printWidth": 80,
     "bracketSpacing": true
   }
   ```

4. Add `.prettierignore` (optional)

   ```txt
    node_modules
    .next
    .vscode
    dist
   ```

5. Vs Code integration - insert into vscode `settings.json`

   ```json
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "editor.formatOnSave": true
   ```

6. Add Scripts to `package.json`

   ```json
   "scripts": {
     "format": "prettier --write .",
     "lint": "next lint",
     "lint:fix": "next lint --fix"
   }
   ```
