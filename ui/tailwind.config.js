module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    corePlugins: {
        preflight: false,
    },
    important: '#root',
    theme: {
        extend: {
            height: {'100': '26rem'}, width: {'100': '26rem'}
        },
    },
    plugins: [],
}

