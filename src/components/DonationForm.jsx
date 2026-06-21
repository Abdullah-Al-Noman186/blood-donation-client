"use client";

import { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosSecure = axios.create({ baseURL: API_URL, withCredentials: true });

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#dc2626" },
  },
};

const DonationForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);

  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      return setCardError("Please enter a valid amount.");
    }

    setProcessing(true);
    setCardError("");

    try {
      // 1. Ask server to create a payment intent for this amount
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: numericAmount,
      });

      // 2. Confirm the card payment using Stripe Elements
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3. Save the fund record to MongoDB
        await axiosSecure.post("/funds", {
          name: user?.displayName || "Anonymous",
          email: user?.email,
          amount: numericAmount,
          date: new Date().toISOString(),
          transactionId: result.paymentIntent.id,
        });

        Swal.fire({
          icon: "success",
          title: "Thank you for your support!",
          text: `You donated $${numericAmount}.`,
          timer: 2000,
          showConfirmButton: false,
        });

        setAmount("");
        elements.getElement(CardElement).clear();
        onSuccess?.();
      }
    } catch (err) {
      setCardError("Something went wrong processing your payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="space-y-6 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
  >
    {/* Header */}
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <span className="text-3xl">❤️</span>
      </div>

      <h2 className="text-3xl font-bold text-gray-800">
        Support Our Mission
      </h2>

      <p className="text-gray-500 mt-2">
        Every donation helps save lives and support blood donors.
      </p>
    </div>

    {/* Amount */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        Donation Amount
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-green-600">
          $
        </span>

        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10.00"
          className="input input-bordered w-full pl-10 h-14 text-lg font-semibold rounded-xl focus:border-green-500 focus:outline-none"
          required
        />
      </div>
    </div>

    {/* Card */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        Card Information
      </label>

      <div className="rounded-xl border border-gray-300 p-4 bg-gray-50 hover:border-green-500 transition-all duration-300">
        <CardElement options={cardStyle} />
      </div>
    </div>

    {/* Error */}
    {cardError && (
      <div className="rounded-lg bg-red-50 border border-red-200 p-3">
        <p className="text-sm text-red-600 font-medium">
          {cardError}
        </p>
      </div>
    )}

    {/* Secure Payment Badge */}
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>

      Secure payment powered by Stripe
    </div>

    {/* Donate Button */}
    <button
      type="submit"
      disabled={!stripe || processing}
      className="btn w-full h-14 rounded-xl text-lg font-bold bg-green-600 hover:bg-green-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
    >
      {processing ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <>
          ❤️ Donate {amount ? `$${amount}` : "Now"}
        </>
      )}
    </button>

    {/* Footer */}
    <div className="text-center text-xs text-gray-400 border-t pt-4">
      Your contribution is encrypted and securely processed.
      <br />
      Thank you for making a difference.
    </div>
  </form>
);
};

export default DonationForm;