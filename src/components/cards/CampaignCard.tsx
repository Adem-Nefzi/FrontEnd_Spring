import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CampaignCardProps {
  campaign: {
    title: string;
    image: string;
    raised: number;
    goal: number;
  };
  index: number;
}

export default function CampaignCard({ campaign, index }: CampaignCardProps) {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
          <div className="space-y-2 mb-4">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Raised: ${campaign.raised.toLocaleString()}
              </span>
              <span className="font-medium">
                Goal: ${campaign.goal.toLocaleString()}
              </span>
            </div>
          </div>
          <Button className="w-full">Donate Now</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
