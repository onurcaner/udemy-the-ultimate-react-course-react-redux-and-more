import { createGlobalStyle } from 'styled-components';

/* https://github.com/prettier/prettier/issues/11196#issuecomment-951878725 */
const styled = { createGlobalStyle };

export const GlobalStyles = styled.createGlobalStyle`
  /*
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Sono:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
  */

  /* Colors adapted from https://tailwindcss.com/docs/customizing-colors */

  :root {
    /* Brand color - Indigo */
    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81;

    /* Grey color */
    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    /* Other Colors */
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;

    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --border-radius-xs: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --transition-duration: 200ms;

    /* For dark mode */
    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  *:disabled {
    cursor: not-allowed;
  }

  html {
    font-size: 112.5%;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    line-height: 1.7rem;
    font-weight: 400;
    min-height: 100vh;
    min-height: 100dvh;
    color: var(--color-grey-700);
  }

  input,
  button,
  textarea,
  select {
    font-family: inherit;
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background-color: none;
    border: none;
    cursor: pointer;
  }

  ol,
  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    display: block;
    width: auto;
    height: auto;
    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }

  span:has(svg) {
    line-height: 0;
  }

  /*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;
