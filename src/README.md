# fetch_with_checks

Status: Pre-pre-alpha

The fetch spec: https://developer.mozilla.org/en-US/docs/Web/API/fetch describes ten different error modes that all throw "TypeError". Nine of these are coding errors and only one is "throws a network error". There is no defined way of telling the difference.
This function provides a wrapper to aim to detect known coding errors in advance.
