import { css } from '@emotion/react'

export const globalStyles = () => {
  return css`
    :root {
      --color-primary: #FF6C37;
      --color-secodary: #111342;
      
      --color-gray: #f3f3f5;
      --color-gray-light: #FAFAFB;

      --color-line: #e7e7ec;
      
      --color-text: #111342;
      --color-text-light: #8889a1;

      --gap-xsmall: 0.25rem;
      --gap-small: 0.5rem;
      --gap-medium: 0.75rem;
      --gap-regular: 1rem;
      --gap-large: 2rem;

      --sidebar-width: 250px;
    }

    body {
      padding: 0;
      margin: 0;
      color: var(--color-text);
    }

    #root {
      height: 100vh;
    }

    iframe {
      display: none;
    }
  `
}
