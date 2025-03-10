"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.error);
      toast.error(data.error);
    } else {
      toast.success("Registration successful! 🎉");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-white-900">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 mt-1 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition placeholder-white/70"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 mt-1 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition placeholder-white/70"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              placeholder="********"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 mt-1 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition placeholder-white/70"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition active:scale-95 shadow-lg"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
