 
import { staticImages } from "../../assets/images";
const AppLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-card flex flex-col items-center justify-center ">
      <img src={staticImages.yamahaLogo} alt="logo" className="h-20 sm:h-36 animate-caret-blink" />
    </div>
  );
};

export default AppLoader;
