import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, { signal: abortController.signal });
        const json = await res.json();

        setData(json);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setLoading(false);
          setError(error);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
