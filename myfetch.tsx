import React, { useEffect, useState } from "react";
import fetch_with_checks from 'fetch_with_checks';
 
const safeFetch = async (url: string) => {

	const controller = new AbortController();
	const signal = controller.signal;
	const timeout = setTimeout(() => controller.abort(), 2000);
	let response;
	let facts;
	try {
		response = await fetch_with_checks(url, {signal});
		if (!response.ok) {
			throw new Error("Invalid response from server fetch");
		}
		facts = await response.json();
	} catch(e) {
		if (e.name === 'AbortError') {
			throw new Error("Download timed out");
		} else {
			throw new Error("Failed to fetch url:" + e)
		}
	} finally {
			clearTimeout(timeout);
	}
  return facts;
};

const FetchItem: React.FC = () => {
  const [getFacts, setFacts] = useState(null);
  const [getError, setError] = useState(null);
  const [getURL, setURL] = useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setURL(event.target.url.value);
  }

  useEffect(async () => {
    if(!getURL) {
      return;
    }

    try {
      const facts = await safeFetch(getURL);
      setFacts(facts);
    } catch (e) {
      setError(e.message);
      return;
    }

  }, [getURL]);

  if(getError) {
    return (<h1>Error Returned: { getError } </h1>);
  };

  if(! getFacts) {
    return (
      <div>Enter a cat facts API URL, such as https://catfact.ninja/fact. Alternatively, paste an invalid url, such as httx://catfact.ninja or https://username:password@catfact.ninja/fact
      <form onSubmit={handleSubmit}>
      <input name="url" placeholder="https://catfact.ninja/fact" />
      <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
  return  (
    <b>{ getFacts.fact }</b>
  );
};

export default FetchItem;
