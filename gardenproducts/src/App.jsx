import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useSelector } from "react-redux";


import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";

import "./style/app.scss";

function App() {
  return (
    <Provider store={store}>
    
      <AppWithTheme />
    </Provider>
  );
}

function AppWithTheme() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={`App ${theme}`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default App;
