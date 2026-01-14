/* JSX
router.jsx
*/

import { createBrowserRouter } from "react-router-dom";

// Pages:
import App from "../App.jsx";
import HomePage from "../pages/HomePage.jsx";
import BookListPage from "../pages/BookListPage.jsx";
import BookDetailsPage from "../pages/BookDetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/041225_react_op4_gutendex_2",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BookListPage />,
      },
      {
        path: "books/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "*",
        element: <p>404 page not found</p>,
      },
    ],
  },
]);

export default router;
