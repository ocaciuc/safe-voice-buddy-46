import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Setup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [companionName, setCompanionName] = useState("");
  const [userName, setUserName] = useState("");
  const [tone, setTone] = useState("warm");

  const handleComplete = () => {
    if (!companionName || !userName) {
      toast({
        title: "Just a moment",
        description: "Please fill in all the details so we can personalize your experience.",
        variant: "default",
      });
      return;
    }

    // Store preferences (will integrate with backend later)
    localStorage.setItem("safevoice_companion", JSON.stringify({
      companionName,
      userName,
      tone,
    }));

    toast({
      title: "Welcome to SafeVoice",
      description: `${companionName} is ready to listen.`,
    });

    navigate("/dashboard");
  };

  const toneOptions = [
    { value: "warm", label: "Warm & Gentle", description: "Soft, comforting, like a close friend" },
    { value: "calm", label: "Calm & Steady", description: "Peaceful, grounding presence" },
    { value: "uplifting", label: "Uplifting & Hopeful", description: "Encouraging and positive" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Let's Create Your Space
          </h1>
          <p className="text-muted-foreground text-lg">
            Take your time. There's no rush.
          </p>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-soft-lg animate-slide-up">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`flex-1 h-1.5 rounded-full mx-1 transition-all duration-300 ${
                  num <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Name your companion */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <Label htmlFor="companionName" className="text-lg mb-2 block">
                  What would you like to call your companion?
                </Label>
                <Input
                  id="companionName"
                  placeholder="e.g., Alex, River, Sam..."
                  value={companionName}
                  onChange={(e) => setCompanionName(e.target.value)}
                  className="text-lg py-6 rounded-xl border-2 focus:border-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Choose a name that feels right to you.
                </p>
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!companionName}
                className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Your name */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <Label htmlFor="userName" className="text-lg mb-2 block">
                  And what should {companionName || "your companion"} call you?
                </Label>
                <Input
                  id="userName"
                  placeholder="Your name or nickname"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-lg py-6 rounded-xl border-2 focus:border-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Use whatever name feels comfortable.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 py-6 text-lg rounded-xl"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!userName}
                  className="flex-1 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Choose tone */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <Label className="text-lg mb-4 block">
                  How would you like {companionName} to speak with you?
                </Label>
                <div className="space-y-3">
                  {toneOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTone(option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        tone === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold mb-1">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 py-6 text-lg rounded-xl"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
                >
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Your conversations are private and secure. We never share your data.
        </p>
      </div>
    </div>
  );
};

export default Setup;
