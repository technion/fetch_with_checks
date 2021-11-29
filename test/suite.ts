import { assert } from "chai";
import node_fetch, { Headers } from "node-fetch";
import fetch_with_checks from "../src/index";

global.fetch = node_fetch as any;
// Mock this common browser feature for tests
global.window = { location: { href: "https://www.example.com" } } as any;

describe("URL Checks", () => {
  it("Should reject unparseable URL", () => {
    assert.throw(() => {
      fetch_with_checks("https://www\u0000example.com");
    }, "URL was unable to parse");
  });

  it("Should reject an invalid header", () => {
    const headers = {
      "C ontent-Type": "text/xml",
      "Breaking-Bad": "<3",
    };
    assert.throw(() => {
      fetch_with_checks("https://example.com/", { headers });
    }, "Header");
  });
  it("Should reject an invalid header", () => {
    const headers = [["Content-Type", "text/html", "extra"], ["Accept"]];
    assert.throw(() => {
      fetch_with_checks("https://example.com/", { headers });
    }, "Header");
  });
  it("Should an invalid scheme", () => {
    assert.throw(() => {
      fetch_with_checks("file://localhost");
    }, "URL provided invalid scheme");
  });
  it("Should reject a username URL", () => {
    assert.throw(() => {
      fetch_with_checks("https://user:password@example.com/");
    }, "URL Provided a username");
  });
  it("Should reject an invalid mode", () => {
    assert.throw(() => {
      fetch_with_checks("https://example.com/", { mode: "this is bad" as any });
    }, "Invalid Mode supplied");
  });
  it("Should reject an unsafe mode", () => {
    assert.throw(() => {
      fetch_with_checks("https://example.com/", {
        mode: "no-cors",
        method: "CONNECT",
      });
    }, "no-cors mode with unsafe method");
  });
});
