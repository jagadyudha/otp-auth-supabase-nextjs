import React from "react";
import { supabase } from "../lib/supabase";

const Home = () => {
  // state to store user info
  const [user, setUser] = React.useState(null);

  // state to store the user input
  const [form, setForm] = React.useState({});

  //state to store page
  const [isVerified, setIsVerified] = React.useState(false);

  //handle otplogin
  const otpLogin = async (form) => {
    try {
      const { error } = await supabase.auth.signIn(form);
      if (error) {
        throw error;
      } else {
        setIsVerified(true);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  //handle otp verify
  const otpVerify = async (form) => {
    try {
      let { user, error } = await supabase.auth.verifyOTP({
        phone: "+13334445555",
        token: "123456",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <main>
      {user ? (
        <div>haiiii</div>
      ) : (
        <>
          {isVerified ? (
            <div>placehoilder</div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your phone number"
                value={form.value}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button onClick={() => otpLogin(form)} type="submit">
                Login with phone
              </button>
            </form>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
