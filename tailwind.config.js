/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			Bungee: ["Bungee Spice", "cursive"],
			Ptmono: ["PT Mono", "monospace"],
		},
		extend: {
			colors: {
				oren: "#e36e00",
			},
		},
	},
	plugins: [],
};
