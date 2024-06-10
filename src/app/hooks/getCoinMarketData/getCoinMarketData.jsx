/*
 * I Will use this hook in future, commented out for now
 */

// import { useState, useEffect } from "react";

// function useCoinMarketDataFetch(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData(url) {
//       try {
//         const options = {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
//           },
//         };

//         setLoading(true);
//         const response = await fetch(url, options);
//         const result = await response.json();
//         setData(result);
//         setError(null);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   return { data, loading, error };
// }

// export default useCoinMarketDataFetch;
