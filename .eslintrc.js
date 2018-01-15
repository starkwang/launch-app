module.exports = {
    "extends": "standard",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
    }
}