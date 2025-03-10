"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-white-600">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-white/20">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 drop-shadow-lg">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 mt-1 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 mt-1 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-yellow-500  py-2 rounded-lg hover:scale-105 transition-transform active:scale-95 shadow-lg"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white drop-shadow-lg">
          Don’t have an account?{" "}
          <a href="/register" className="text-white font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
