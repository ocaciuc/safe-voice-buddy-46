import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Our Commitment to Your Privacy</h2>
              <p className="text-foreground/90 leading-relaxed">
                SafeVoice is built on trust. Your emotional well-being and privacy are our highest priorities. 
                This policy explains what information we collect, how we protect it, and your rights regarding your data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Account Information</h3>
                <p className="text-foreground/90 leading-relaxed">
                  When you create an account, we collect your email address and authentication details. 
                  You may also provide optional information such as your display name and companion preferences.
                </p>
                
                <h3 className="text-lg font-medium text-foreground">Conversation Data</h3>
                <p className="text-foreground/90 leading-relaxed">
                  Your conversations with SafeVoice are stored securely and encrypted. We maintain conversation 
                  history and journal entries to provide you with continuity and reflection capabilities.
                </p>
                
                <h3 className="text-lg font-medium text-foreground">Usage Information</h3>
                <p className="text-foreground/90 leading-relaxed">
                  We collect basic usage data such as session times, feature usage, and technical information 
                  to improve our service and ensure optimal performance.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">How We Protect Your Data</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>End-to-end encryption for all conversations</li>
                <li>Secure cloud storage with industry-standard protocols</li>
                <li>Regular security audits and updates</li>
                <li>Strict access controls limiting who can view your data</li>
                <li>No selling or sharing of personal data with third parties</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
              <p className="text-foreground/90 leading-relaxed">
                We use your information solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Provide and improve SafeVoice services</li>
                <li>Personalize your AI companion experience</li>
                <li>Maintain conversation continuity and journal features</li>
                <li>Send important service updates and notifications</li>
                <li>Analyze aggregated, anonymized data to improve our AI models</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Your Rights</h2>
              <p className="text-foreground/90 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Access all data we have about you</li>
                <li>Request corrections to your information</li>
                <li>Delete your account and all associated data</li>
                <li>Export your conversation history and journal entries</li>
                <li>Opt out of optional data collection</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Data Retention</h2>
              <p className="text-foreground/90 leading-relaxed">
                We retain your data for as long as your account is active. When you delete your account, 
                all personal information and conversations are permanently removed within 30 days, except 
                where required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Children's Privacy</h2>
              <p className="text-foreground/90 leading-relaxed">
                SafeVoice is not intended for users under 13 years of age. We do not knowingly collect 
                information from children under 13.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Changes to This Policy</h2>
              <p className="text-foreground/90 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant 
                changes via email or through the app.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-foreground/90 leading-relaxed">
                If you have questions about this privacy policy or how we handle your data, 
                please contact us at privacy@safevoice.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
