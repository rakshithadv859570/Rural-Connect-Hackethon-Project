import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Retrieve email from navigation state

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:7000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || "OTP verification failed";
        } catch {
          errorMessage = responseText;
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      alert("User registered successfully!");
      navigate('/login'); // Redirect to login page

    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">Verify Your OTP</h2>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {success && <p className="text-green-500 text-xs italic mb-4">OTP verified successfully!</p>}

        {/* OTP Input Field */}
        <div className="mb-6">
          <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
            OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;
