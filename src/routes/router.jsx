/* JSX
router.jsx
*/

import { createHashRouter } from "react-router-dom";

// Pages:
import App from "../App.jsx";
import HomePage from "../pages/HomePage.jsx";
import BookListPage from "../pages/BookListPage.jsx";
import BookDetailsPage from "../pages/BookDetailsPage.jsx";

const router = createHashRouter([
  {
    path: "/",
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
