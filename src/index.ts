class URLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "URLError";
  }
};

class HeaderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HeaderError";
  }
}

class ModeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModeError";
  }
}

const fetch_with_checks = (
  resource: string,
  init: RequestInit = {}
): Promise<Response> => {
  
  // URL Guards
  let checked_url: URL;
  try {
    checked_url = new URL(resource, window.location.href); // Will throw on its own on an invalid url
  } catch(e) {
    throw new URLError("URL was unable to parse" + e);
  }

  if (checked_url.username) {
    throw new URLError("URL Provided a username");
  }

  if (!["https:", "http:"].includes(checked_url.protocol)) {
    throw new URLError("URL provided invalid scheme");
  }

  // All header checks can be checked in one simple check
  if (init.headers) {
    try {
      new Headers(init.headers); // Will throw on its own on an invalid header
    } catch(_) {
      throw new HeaderError("Invalid Header");
    }
  }

  // Mode errors
  if (init.mode && !["same-origin", "no-cors", "cors"].includes(init.mode)) {
    throw new ModeError("Invalid Mode supplied");
  }

  return fetch(checked_url.href, init);
};

export default fetch_with_checks;
