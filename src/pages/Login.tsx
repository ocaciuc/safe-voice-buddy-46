import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          }
        });

        if (error) {
          toast.error(
            error.message === 'User already registered'
              ? "This email is already registered. Try logging in instead."
              : "Something went wrong — let's try again calmly."
          );
        } else {
          toast.success("Welcome! Your account is ready.");
          navigate('/setup');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(
            error.message === 'Invalid login credentials'
              ? "We couldn't find that account. Double-check your email and password?"
              : "Something went wrong — let's try again calmly."
          );
        } else {
          toast.success("Welcome back — your space is ready.");
          navigate('/dashboard');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        toast.error("Something went wrong — let's try again calmly.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isSignUp
              ? "Begin your journey to emotional clarity"
              : "Continue your journey with SafeVoice"}
          </p>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-soft-lg animate-slide-up">
          <form onSubmit={handleEmailAuth} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base py-6 rounded-xl border-2 focus:border-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-base mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base py-6 rounded-xl border-2 focus:border-primary"
                required
              />
            </div>

            {!isSignUp && (
              <div className="text-right">
                <Button
                  type="button"
                  variant="link"
                  className="text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
            >
              {isLoading ? "..." : (isSignUp ? "Create Account" : "Sign In")}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full py-6 text-lg rounded-xl border-2"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
                className="text-muted-foreground hover:text-foreground"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Your privacy is our priority. All data is encrypted and secure.
        </p>
      </div>
    </div>
  );
};

export default Login;
