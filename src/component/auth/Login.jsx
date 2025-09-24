import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [step, setStep] = useState("phone"); 
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); 

  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      return alert("Enter a valid phone number");
    }
    
    console.log("Sending OTP to:", phone);
    setOtp("");
    setStep("otp");
    setTimeLeft(120); 
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      return alert("Enter 4-digit OTP");
    }
    console.log("Verifying OTP:", otp);
    alert("✅ Phone verified!");

    navigate("/dashboard");
  };

  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (step === "otp" && timeLeft === 0) {
      setStep("phone");
    }
  }, [step, timeLeft]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <img
            src="/gemini- .svg"
            alt="Gemini"
            className="mx-auto w-10 h-10"
          />
          <h1 className="text-2xl font-semibold mt-2">
            {step === "phone" ? "Sign in with Phone" : "Verify OTP"}
          </h1>
        </div>

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex">
              <select className="px-2 py-2 border rounded-l-lg focus:outline-none">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-2 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                maxLength={10}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "")) 
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 4-digit OTP"
              maxLength={4}
              className="w-full px-4 py-2 border rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} 
            />

            <p className="text-center text-sm text-gray-500">
              Time left: <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <p className="text-sm text-center mt-4">
            Wrong number?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setStep("phone")}
            >
              Edit
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
