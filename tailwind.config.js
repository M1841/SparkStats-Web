/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f11",
        "dark-dim": "#212024",
        medium: "#3a383f",
        "light-dim": "#a39fa9",
        light: "#fbfbfb",
        "primary-dark": "#132821",
        "primary-medium": "#1c3d31",
        "primary-light": "#69dfb0",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    ({ addUtilities, theme, e }) => {
      const colors = theme("colors");
      const strokeUtilities = Object.keys(colors).reduce((acc, color) => {
        const colorShades = colors[color];
        if (typeof colorShades === "object") {
          Object.keys(colorShades).forEach((shade) => {
            acc[`.stroke-${e(`${color}-${shade}`)}`] = {
              stroke: colorShades[shade],
            };
          });
        } else {
          acc[`.stroke-${e(color)}`] = {
            stroke: colorShades,
          };
        }
        return acc;
      }, {});

      addUtilities(strokeUtilities, ["responsive", "hover"]);
    },
  ],
};
