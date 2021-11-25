
const fetch_with_checks = (resource: string, init: RequestInit = {}): Promise<Response> => {

    let myHeaders = new fetch.Headers();

    let checked_url = new URL(resource); // Will throw on its own on an invalid url

    let checked_init: RequestInit = {}
    if (checked_url.username) {
        throw new Error("Provided Username")
    }
    if (init.headers) {
        console.log(init.headers);
        checked_init.headers = new Headers(init.headers); // Will throw on its own on an invalid header
    }
    return fetch(checked_url.href, checked_init);
}

export default fetch_with_checks;