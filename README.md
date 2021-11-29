# fetch_with_checks

Status: Pre-pre-alpha

The fetch spec: https://developer.mozilla.org/en-US/docs/Web/API/fetch describes ten different error modes that all throw "TypeError". Nine of these are coding errors and only one is "throws a network error". There is no defined way of telling the difference.
This function provides a wrapper to aim to detect known coding errors in advance.

# Error Types

## URLError
- URL Fails to parse as a `new URL()`, eg `fetch_with_checks("\x00")`
- URL Contains a credentials, eg `fetch_with_checks("https://user:password@example.com/")`
- URL Contains invalid scheme, eg `fetch_with_checks("hxxp://example.com")`

## HeaderError

All variations of invalid headers will throw this error, examples from the API guide:
```
// space in "C ontent-Type"
const headers = {
    "C ontent-Type": "text/xml",
    "Breaking-Bad": "<3"
};


const headers = [
    ["Content-Type", "text/html", "extra"],
    ["Accept"],
];

```

## ModeError
- Provided mode is not from a valid list, eg `fetch_with_checks("https://example.com/", { mode: "not a mode" })`
- Mode is no-cors but method is not a cors-safe method, eg `fetch_with_checks("https://example.com/", { mode: "no-cors", method: 'CONNECT' })`
