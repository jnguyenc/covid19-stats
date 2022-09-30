async function fetchData(urls) {
  return Promise.all(urls.map((url) => fetch(url)))
    .then((responses) => Promise.all(responses.map((res) => res.json())));
}

export default fetchData;
