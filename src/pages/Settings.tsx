import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Bell, Lock, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const companion = JSON.parse(localStorage.getItem("safevoice_companion") || "{}");

  const handleLogout = async () => {
    await signOut();
    toast.success("See you soon — your progress is saved. Come back anytime.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-6 py-8">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="w-10" />
        </div>

        {/* Profile Section */}
        <Card className="p-6 rounded-3xl mb-6 animate-slide-up bg-card border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
              {companion.userName?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{companion.userName || "User"}</h3>
              <p className="text-sm text-muted-foreground">
                Companion: {companion.companionName || "Not set"}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/setup")}
              className="rounded-xl"
            >
              Edit
            </Button>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="p-6 rounded-3xl animate-slide-up bg-card border-border" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-reminder" className="text-base">
                    Daily check-in reminder
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get a gentle nudge to reflect
                  </p>
                </div>
                <Switch id="daily-reminder" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="insights" className="text-base">
                    Weekly insights
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Summary of your emotional journey
                  </p>
                </div>
                <Switch id="insights" />
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6 rounded-3xl animate-slide-up bg-card border-border" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-positive/10">
                <Lock className="w-5 h-5 text-positive" />
              </div>
              <h3 className="text-lg font-semibold">Privacy & Security</h3>
            </div>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-muted rounded-xl"
              >
                <div>
                  <div className="font-medium">Data & Privacy</div>
                  <div className="text-sm text-muted-foreground">
                    Manage your data and privacy settings
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-muted rounded-xl"
              >
                <div>
                  <div className="font-medium">Export Conversations</div>
                  <div className="text-sm text-muted-foreground">
                    Download your journal entries
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {/* Support */}
          <Card className="p-6 rounded-3xl animate-slide-up bg-card border-border" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-accent/10">
                <HelpCircle className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Support</h3>
            </div>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-muted rounded-xl"
              >
                <div>
                  <div className="font-medium">Help Center</div>
                  <div className="text-sm text-muted-foreground">
                    FAQs and guides
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-muted rounded-xl"
              >
                <div>
                  <div className="font-medium">Contact Us</div>
                  <div className="text-sm text-muted-foreground">
                    Get in touch with support
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {/* Logout */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full py-6 text-lg rounded-xl border-2 hover:bg-destructive/5 hover:border-destructive hover:text-destructive animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Version Info */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          SafeVoice v1.0.0 • Made with care
        </p>
      </div>
    </div>
  );
};

export default Settings;
