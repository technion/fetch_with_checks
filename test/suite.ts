import { assert } from "chai";
import fetch, { Headers } from "node-fetch";
import fetch_with_checks from "../src/index";

global.fetch = fetch;
global.Headers = Headers;

describe("URL Checks", () => {
  it("Should reject dumb URL", () => {
    assert.throw(() => {
      fetch_with_checks("holy kek");
    }, "Invalid URL");
  });

  it("Should reject an invalid header", () => {
    const headers = {
      "C ontent-Type": "text/xml",
      "Breaking-Bad": "<3",
    };
    assert.throw(() => {
      fetch_with_checks("https://example.com/", { headers });
    }, "Header name must be a valid");
  });
  it("Should reject an invalid header", () => {
    const headers = [["Content-Type", "text/html", "extra"], ["Accept"]];
    assert.throw(() => {
      fetch_with_checks("https://example.com/", { headers });
    }, "Each header pair");
  });
  it("Should an invalid scheme", () => {
    assert.throw(() => {
      fetch_with_checks("file://localhost");
    }, "Invalid scheme");
  });
  it("Should reject a username URL", () => {
    assert.throw(() => {
      fetch_with_checks("https://user:password@example.com/");
    }, "Provided Username");
  });
});
