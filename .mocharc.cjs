module.exports = {
    "recursive": "true",
    "package": "./tests/package.json",
    "extension": ["js", "cjs", "mjs", "ts", "svelte", "json"],
    "transform": {
        "^.+\\.svelte$": "svelte"
    },
}
