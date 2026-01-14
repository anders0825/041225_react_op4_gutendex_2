/* JSX
App.jsx
*/

import { Outlet } from "react-router-dom";
import { AppStateProvider } from "./context/AppStateContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <AppStateProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </AppStateProvider>
  );
}
