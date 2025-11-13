import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, BookOpen, Settings, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface CompanionData {
  companionName: string;
  userName: string;
  tone: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [companion, setCompanion] = useState<CompanionData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("safevoice_companion");
    if (stored) {
      setCompanion(JSON.parse(stored));
    } else {
      navigate("/setup");
    }
  }, [navigate]);

  if (!companion) return null;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            {greeting()}, {companion.userName}
          </h1>
          <p className="text-xl text-muted-foreground">
            {companion.companionName} is here to listen.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Start Conversation */}
          <Card
            onClick={() => navigate("/chat")}
            className="p-8 cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02] rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-slide-up"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Start Talking</h3>
            <p className="text-muted-foreground">
              Begin a conversation whenever you need to express yourself
            </p>
          </Card>

          {/* View Journal */}
          <Card
            onClick={() => navigate("/journal")}
            className="p-8 cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02] rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-accent/10">
                <BookOpen className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Your Journal</h3>
            <p className="text-muted-foreground">
              Reflect on past conversations and emotional insights
            </p>
          </Card>
        </div>

        {/* Check-in Card */}
        <Card className="p-8 rounded-3xl bg-card border-border mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-positive/10">
              <Heart className="w-6 h-6 text-positive" />
            </div>
            <h3 className="text-xl font-semibold">Quick Check-in</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            How are you feeling right now? Take a moment to notice.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Calm", "Anxious", "Happy", "Overwhelmed", "Peaceful", "Uncertain"].map((feeling) => (
              <Button
                key={feeling}
                variant="outline"
                className="rounded-full hover:bg-primary/10 hover:border-primary"
              >
                {feeling}
              </Button>
            ))}
          </div>
        </Card>

        {/* Settings Link */}
        <div className="text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Button
            variant="ghost"
            onClick={() => navigate("/settings")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings & Privacy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
