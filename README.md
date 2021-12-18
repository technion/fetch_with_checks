# fetch_with_checks

Status: Works

The fetch spec: https://developer.mozilla.org/en-US/docs/Web/API/fetch describes ten different error modes that all throw "TypeError". Nine of these are coding errors and only one is "throws a network error". There is no defined way of telling the difference.
This function provides a wrapper to aim to detect known coding errors in advance.

# Example

An example can be found in [myfetch.tsx](myfetch.tsx). This is an example module containing a React element to implement a cat facts lookup. When supplying a valid URL, the expected result is given. When a URL is invalid, the output will clearly explain why.

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

