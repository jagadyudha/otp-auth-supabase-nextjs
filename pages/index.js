import React from "react";
import { supabase } from "../lib/supabase";

const Home = () => {
  // state to store user info
  const [user, setUser] = React.useState(null);

  // state to store the user input
  const [form, setForm] = React.useState({ phone: "", token: "" });

  //state to store page
  const [isVerified, setIsVerified] = React.useState(false);

  // state to handle login
  const [isLoading, setIsLoading] = React.useState(true);

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
      const { error } = await supabase.auth.verifyOTP(form);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  React.useEffect(() => {
    setUser(supabase.auth.user());
    setIsLoading(false);
  }),
    [];

  if (isLoading) return <div></div>;

  return (
    <main className="max-w-md mx-auto px-8 h-screen flex items-center">
      {user ? (
        <div>
          <span className=" block">You're login with</span>
          <span className="text-3xl block">{user.phone}</span>
          <button
            className="my-8 bg-rose-500 text-white w-full font-medium py-3 rounded-lg"
            onClick={async () => {
              await supabase.auth.signOut();
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          {isVerified ? (
            <div>
              <h1 className="font-bold text-4xl">Verify your phone number</h1>
              <p className="text-gray-500 my-8">Enter your OTP code here</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  className="bg-gray-200  p-3 rounded-lg w-full focus:outline-none text-gray-800"
                  placeholder="123456"
                  value={form.token}
                  onChange={(e) => setForm({ ...form, token: e.target.value })}
                />
                <button
                  className="my-8 bg-rose-500 text-white w-full font-medium py-3 rounded-lg"
                  onClick={() => otpVerify(form)}
                  type="submit"
                >
                  Verify
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="font-bold text-4xl">
                Sign up to keep ordering amazing book!
              </h1>
              <p className="text-gray-500 my-8">
                Add your phone number. We'll send you a verification code so we
                know you're real.
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="tel"
                  className="bg-gray-200  p-3 rounded-lg w-full focus:outline-none text-gray-800"
                  placeholder="+627434567890"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <button
                  className="my-8 bg-rose-500 text-white w-full font-medium py-3 rounded-lg"
                  onClick={() => otpLogin(form)}
                  type="submit"
                >
                  Send OTP
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
