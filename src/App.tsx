import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster as SonnerToaster } from "sonner";
import { store } from "@/store";
import applicationRouter from "@/router";

const App = () => (
  <Provider store={store}>
    <RouterProvider router={applicationRouter} />

    <SonnerToaster
      position="bottom-center"
      richColors
      closeButton
      expand={true}
      duration={3000}
      theme="light"
    />
  </Provider>
);

export default App;
