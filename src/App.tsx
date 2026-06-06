import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { store } from "@/store";
import applicationRouter from "@/router";

const App = () => (
  <Provider store={store}>
    <RouterProvider router={applicationRouter} />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1C1917",
          color: "#FAFAF9",
          fontSize: "0.8125rem",
          borderRadius: "1rem",
          padding: "12px 16px",
        },
      }}
    />

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
