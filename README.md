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
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
```

Then, use the Image component, making sure to include all required props.
Note: If the image is `above the fold` (visible without scrolling), use the `priority` prop to prefetch it.

```html
<image
  className="rounded-full w-8 h-8"
  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
  alt="user avatar"
  width="{50}"
  height="{50}"
  priority
/>
```

## Code Snippets

Remember useful code snippets, such as `prc` for page components, `mr` for metadata exports, `rafc` for React functional components, etc.

## UI

### Icons

In this projects, we use React Icons. Learn more [here](https://react-icons.github.io/react-icons/)

Intallation:

```bash
npm install react-icons --save
```

### Components from [TW components](https://www.creative-tim.com/twcomponents)

- #### [Sidebar component](https://www.creative-tim.com/twcomponents/component/dashboard-navigation)

- #### [Card component](https://www.creative-tim.com/twcomponents/component/user-card-7)

- #### [Pokemon page](https://www.creative-tim.com/twcomponents/component/profile-information-card-horizon-ui-tailwind)

- #### [404 page](https://www.creative-tim.com/twcomponents/component/404-page-not-found)

- #### [Error page component](https://www.creative-tim.com/twcomponents/component/tailwind-css-500-server-error-illustration)

### Note: Tailwind CSS Configuration

Ensure that the paths to all files using Tailwind styles are included in the tailwind.config.ts file. In this project, the pokemons and shopping-cart folders have been added.

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // pokemons and shopping-cart folders with tailwind styles
    './src/pokemons/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shopping-cart/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

## Redux Toolkit

<!-- TODO: Creste a "How To" sync server and client -->
<!-- TODO: Create a "How To" guide for building a Next.js API and initializing data from that API. -->

For more information, see the Redux Toolkit documentation: [https://redux-toolkit.js.org/tutorials/quick-start](https://redux-toolkit.js.org/tutorials/quick-start)

- Installation

  ```bash
  npm install @reduxjs/toolkit react-redux
  ```

- Store creation (`src/store/index.ts`). Snippet `rx-store`.

  ```typescript
  import { configureStore } from '@reduxjs/toolkit';

  import { useDispatch, useSelector } from 'react-redux';
  import counterReducer from './counter/counterSlice';

  export const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;

  // Use throughout your app instead of plain `useDispatch` and `useSelector`
  export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  export const useAppSelector = useSelector.withTypes<RootState>();
  ```

- Counter Slice (`src/store/counter/CounterSlice.ts`). Snippet `rx-slice-counter-example`.

  ```typescript
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';

  interface CounterState {
    count: number;
  }

  const initialState: CounterState = {
    count: 5,
  };

  const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      addOne(state) {
        state.count++;
      },

      substractOne(state) {
        if (state.count === 0) return;

        state.count--;
      },
      resetCount(state, action: PayloadAction<number>) {
        if (state.count === action.payload) return;
        if (action.payload < 0) return;

        state.count = action.payload;
      },
    },
  });

  export const { addOne, substractOne, resetCount } = counterSlice.actions;

  export default counterSlice.reducer;
  ```

- Redux Provider Setup (`src/store/Provider.tsx`). Snippet `rx-provider-custom`.

  **Note:** Considerations Regarding Redux Provider Usage in the Main Layout
  The Redux Provider component cannot be directly utilized within the main layout (`src/app/layout.tsx`) due to its server-side rendering context, while the application's global state must be managed on the client-side. Furthermore, the 'use client' directive cannot be applied within this file, as it would lead to errors during the Next.js build process.
  Consequently, the optimal solution involves creating an auxiliary HOC component that incorporates the 'use client' directive and the Redux Provider component. This auxiliary component can be found in `src/store/Provider.tsx`.

  ```typescript
  'use client';

  import { Provider } from 'react-redux';
  import { store } from './index';

  interface Props {
    children: React.ReactNode;
  }

  export const Providers = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
  };

  ```

- Usage in Main Layout (`src/app/layout.tsx`)

  ```typescript
  import { Providers } from '@/store/Providers';
  import type { Metadata } from 'next';
  import { Geist, Geist_Mono } from 'next/font/google';
  import './globals.css';

  const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
  });

  const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
  });

  export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }
  ```

- After setting up Redux as shown above, you can use it in client-side components like `src/shopping-cart/components/CartCounter.tsx`.

  ```typescript
  'use client';

  import { useAppDispatch, useAppSelector } from '@/store';
  import { addOne, substractOne } from '@/store/counter/counterSlice';

  interface Props {
    value?: number;
  }

  export const CartCounter = ({ value = 0 }: Props) => {
    const count = useAppSelector((state) => state.counter.count);
    const dispatch = useAppDispatch();

    return (
      <>
        <span className="text-9xl">{count}</span>
        <div className="flex">
          <button
            className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
            onClick={() => dispatch(substractOne())}
          >
            -1
          </button>
          <button
            className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
            onClick={() => dispatch(addOne())}
          >
            +1
          </button>
        </div>
      </>
    );
  };
  ```

## Config Eslint and Prettier with Google code styles - Use in all NextJs projects

This `md-config-eslint-prettier-next` snippet can be used in other projects to quickly document to the project's developers how Prettier and ESLint were configured.

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
