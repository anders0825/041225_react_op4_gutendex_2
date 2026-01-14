/* JSX
main.jsx
*/

// react_modules
import { createRoot } from "react-dom/client";

// routes
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";

// Global CSS:
import "./styles/styleGlobals/global.css";
import "./styles/styleGlobals/index.css";
import "./styles/styleGlobals/App.css";

// Components CSS:
import "./styles/styleComponents/Header.css";
import "./styles/styleComponents/FavoriteBtn.css";
import "./styles/styleComponents/Loading.css";

// Pages CSS:
import "./styles/stylePages/BookDetailsPage.css";
import "./styles/stylePages/BookListPage.css";
import "./styles/stylePages/HomePage.css";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
