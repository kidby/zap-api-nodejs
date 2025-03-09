
module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            jsdoc: require("eslint-plugin-jsdoc"),
        },
        rules: {
            "max-len": ["error", { code: 150 }],
            "prefer-arrow-callback": "error",
            "func-style": ["error", "expression"],
            "arrow-parens": ["error", "as-needed"],
            "object-curly-spacing": ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],
            "semi": ["error", "always"],
            "class-methods-use-this": "off",
            "jsdoc/check-tag-names": "error",
            "jsdoc/check-param-names": "error",
        },
        linterOptions: {
            noInlineConfig: false,
            reportUnusedDisableDirectives: "warn",
        },
    },
];
