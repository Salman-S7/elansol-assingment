// import defaultTheme from "tailwindcss/defaultTheme";

// import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{ts,tsx}"];
export const darkMode = "class";
export const theme = {
  // rest of the code
  extend: {
    boxShadow: {
      input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
    },
  },
};
export const plugins = [addVariablesForColors];

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
