@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-obsidian: #0a0a0b;
  --color-vantage-blue: #1e293b;
  --color-slate: #334155;
  --color-silver: #e5e7eb;
  --color-bone: #f5f5f4;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-obsidian);
  color: white;
  font-feature-settings: "ss01", "cv11";
}

/* Selection styling */
::selection {
  background-color: white;
  color: black;
}

/* Disable bouncy scroll on iOS for the polished feel */
@supports (-webkit-touch-callout: none) {
  body {
    -webkit-overflow-scrolling: touch;
  }
}
