import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Welcome to SafeVoice</h2>
              <p className="text-foreground/90 leading-relaxed">
                By using SafeVoice, you agree to these terms. Please read them carefully. 
                SafeVoice is an AI companion designed to provide emotional support and a safe space 
                for reflection — not a substitute for professional mental health services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
              <p className="text-foreground/90 leading-relaxed">
                By accessing or using SafeVoice, you agree to be bound by these Terms of Service 
                and our Privacy Policy. If you do not agree, please do not use our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">What SafeVoice Is</h2>
              <p className="text-foreground/90 leading-relaxed">
                SafeVoice is an AI-powered emotional companion that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>A safe, judgment-free space to express your thoughts</li>
                <li>Empathetic conversation and active listening</li>
                <li>Journaling and reflection tools</li>
                <li>Emotional check-ins and mindful reminders</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">What SafeVoice Is Not</h2>
              <p className="text-foreground/90 leading-relaxed font-medium">
                Important: SafeVoice is NOT a replacement for professional mental health services.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>SafeVoice does not provide medical advice, diagnosis, or treatment</li>
                <li>SafeVoice is not a crisis intervention service</li>
                <li>SafeVoice cannot replace therapists, counselors, or medical professionals</li>
                <li>In case of emergency or crisis, please contact emergency services or a crisis hotline</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                If you are experiencing a mental health crisis, please contact:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Emergency Services: 911 (US)</li>
                <li>National Suicide Prevention Lifeline: 988</li>
                <li>Crisis Text Line: Text HOME to 741741</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">User Responsibilities</h2>
              <p className="text-foreground/90 leading-relaxed">
                By using SafeVoice, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Provide accurate account information</li>
                <li>Keep your login credentials secure</li>
                <li>Use the service in a lawful and respectful manner</li>
                <li>Not attempt to harm, exploit, or misuse the service</li>
                <li>Understand the limitations of AI support</li>
                <li>Seek professional help when needed</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Account and Access</h2>
              <p className="text-foreground/90 leading-relaxed">
                You must be at least 13 years old to use SafeVoice. Users under 18 should have 
                parental consent. You are responsible for maintaining the confidentiality of your 
                account and for all activities under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Service Availability</h2>
              <p className="text-foreground/90 leading-relaxed">
                We strive to provide reliable service, but we cannot guarantee uninterrupted access. 
                We may modify, suspend, or discontinue features at any time with reasonable notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Content and Intellectual Property</h2>
              <p className="text-foreground/90 leading-relaxed">
                You retain ownership of the content you create (conversations, journal entries). 
                SafeVoice and its technology, design, and branding are our intellectual property.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
              <p className="text-foreground/90 leading-relaxed">
                SafeVoice is provided "as is" without warranties of any kind. We are not liable for 
                decisions made based on conversations with the AI. Always consult qualified professionals 
                for important decisions affecting your health, safety, or well-being.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Termination</h2>
              <p className="text-foreground/90 leading-relaxed">
                You may delete your account at any time from Settings. We reserve the right to 
                suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
              <p className="text-foreground/90 leading-relaxed">
                We may update these terms from time to time. Continued use after changes constitutes 
                acceptance of the updated terms. We will notify you of significant changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Governing Law</h2>
              <p className="text-foreground/90 leading-relaxed">
                These terms are governed by the laws of the jurisdiction in which SafeVoice operates, 
                without regard to conflict of law provisions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-foreground/90 leading-relaxed">
                Questions about these terms? Contact us at support@safevoice.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
