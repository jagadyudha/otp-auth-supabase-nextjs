import "../styles/globals.css";
import { supabase } from "../lib/supabase";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
