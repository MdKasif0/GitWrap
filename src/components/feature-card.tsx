import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
      <CardHeader>
        {icon}
        <CardTitle className="mt-4 text-lg font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
