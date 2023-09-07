import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-default)", ...fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        input: "var(--input)",
      },
    },
  },
  plugins: [],
} satisfies Config;
