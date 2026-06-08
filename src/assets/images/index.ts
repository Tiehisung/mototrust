import avatar from "./avatar.png";
 
import yamaha from "../../yamaha.png";

import { ENV } from "@/lib/env";

export const logos = {
  logoWhite: ENV.LOGO_URL,
  logoTrans: ENV.LOGO_NO_BG_URL,
  opponentLogoWhite: ENV.OPPONENT_LOGO_URL,
  opponentLogoTrans: ENV.OPPONENT_LOGO_NO_BG_URL,
}

export const staticImages = {
  avatar,
  ...logos
,yamaha
};

