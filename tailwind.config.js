module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            default: ["Kanit", "sans-serif"],
            input: ["Montserrat\\ Alternates", "sans-serif"],
        },
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};
