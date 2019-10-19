
module.exports =
  {
    extends: [
      require.resolve("eslint-config-airbnb")
    ],
    plugins: ["import", "promise", "compat", "react"],
    parser: require.resolve("babel-eslint"),
    parserOptions: {
      sourceType: "module",
      allowImportExportEverywhere: true
    },
    env: {
      browser: true,
      node: true
    },
    overrides:
      [
        // eslint-disable-next-line global-require
        Object.assign({}, require("eslint-plugin-jest").configs.recommended,
          {
            files: ["**/*.test.js", "**/__mocks__/**"],
            env:
            {
              browser: false,
              jest: true,
              node: true
            },
            plugins: ["jest"],
            rules:
            {
              "jest/no-disabled-tests": "warn",
              "jest/no-focused-tests": "error",
              "jest/no-identical-title": "error"
            }
          })
      ],
    rules: {
      "max-len": ["warn", { code: 150 }],
      "array-bracket-spacing": [2, "never"],
      "arrow-parens": "off",
      "brace-style": ["error", "allman", { allowSingleLine: true }],
      "comma-dangle": "off",
      "compat/compat": "error",
      "consistent-return": "off",
      curly: ["error", "all"],
      "function-parem-newline": "never",
      "generator-star-spacing": "off",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "import/no-unresolved": "error",
      "jsx-a11y/anchor-is-valid": "off",
      "no-console": "off",
      "no-multi-assign": "off",
      "no-use-before-define": "off",
      "object-curly-newline": ["error",
        {
          ImportDeclaration: "never",
          ExportDeclaration: "never"
        }],
      "operator-linebreak": ["error", "after", { overrides: { "?": "ignore", ":": "ignore" } }],
      "promise/always-return": "error",
      "promise/catch-or-return": "error",
      "promise/no-native": "off",
      "promise/param-names": "error",
      quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
      "react/jsx-no-bind": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
      "react/prefer-stateless-function": "off",
      "react/sort-comp": [
        "error",
        {
          order: [
            "type-annotations",
            "static-methods",
            "lifecycle",
            "everything-else",
            "render"
          ],
        },
      ]
    }
  };
