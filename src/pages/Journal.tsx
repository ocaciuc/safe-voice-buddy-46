import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Heart, MessageCircle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Journal = () => {
  const navigate = useNavigate();

  // Mock journal entries (will integrate with backend later)
  const entries = [
    {
      id: "1",
      date: new Date(),
      mood: "calm",
      summary: "Talked about feeling overwhelmed with work deadlines. Found clarity around prioritizing self-care.",
      emotions: ["Anxious", "Hopeful", "Relieved"],
      duration: "12 min",
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000),
      mood: "peaceful",
      summary: "Reflected on recent family conversation. Gained perspective on setting boundaries.",
      emotions: ["Grateful", "Empowered", "Peaceful"],
      duration: "18 min",
    },
  ];

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      calm: "bg-primary/10 text-primary border-primary/20",
      peaceful: "bg-positive/10 text-positive border-positive/20",
      anxious: "bg-alert/10 text-alert border-alert/20",
      happy: "bg-accent/10 text-accent-foreground border-accent/20",
    };
    return colors[mood] || "bg-muted/10 text-muted-foreground border-muted/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Your Journal</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          <Card className="p-4 rounded-2xl text-center bg-card border-border">
            <div className="text-2xl font-bold text-primary mb-1">{entries.length}</div>
            <div className="text-sm text-muted-foreground">Conversations</div>
          </Card>
          <Card className="p-4 rounded-2xl text-center bg-card border-border">
            <div className="text-2xl font-bold text-accent-foreground mb-1">30</div>
            <div className="text-sm text-muted-foreground">Total minutes</div>
          </Card>
          <Card className="p-4 rounded-2xl text-center bg-card border-border">
            <div className="text-2xl font-bold text-positive mb-1">7</div>
            <div className="text-sm text-muted-foreground">Day streak</div>
          </Card>
          <Card className="p-4 rounded-2xl text-center bg-card border-border">
            <div className="text-2xl font-bold text-foreground mb-1">5</div>
            <div className="text-sm text-muted-foreground">Insights</div>
          </Card>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <Card
              key={entry.id}
              className="p-6 rounded-3xl hover:shadow-soft-lg transition-all duration-300 cursor-pointer animate-slide-up bg-card border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Entry Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-muted">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {entry.date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <MessageCircle className="w-4 h-4" />
                      {entry.duration}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm border ${getMoodColor(entry.mood)}`}>
                  {entry.mood}
                </div>
              </div>

              {/* Summary */}
              <p className="text-foreground/80 mb-4 leading-relaxed">
                {entry.summary}
              </p>

              {/* Emotions */}
              <div className="flex items-center gap-2 flex-wrap">
                <Heart className="w-4 h-4 text-muted-foreground" />
                {entry.emotions.map((emotion) => (
                  <span
                    key={emotion}
                    className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no entries) */}
        {entries.length === 0 && (
          <Card className="p-12 rounded-3xl text-center bg-card border-border animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your journal awaits</h3>
              <p className="text-muted-foreground mb-6">
                Start a conversation and your reflections will appear here.
              </p>
              <Button
                onClick={() => navigate("/chat")}
                className="bg-primary hover:bg-primary/90 rounded-xl"
              >
                Start Your First Conversation
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Journal;
