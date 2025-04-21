"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function CampaignsSection() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Featured Projects
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Current Campaigns</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Support these verified campaigns and make a real difference in
            people's lives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Clean Water Initiative",
              image:
                "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              raised: 15000,
              goal: 20000,
            },
            {
              title: "Education for All",
              image:
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500",
              raised: 8000,
              goal: 12000,
            },
            {
              title: "Food Security Program",
              image:
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=500",
              raised: 25000,
              goal: 30000,
            },
          ].map((campaign, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {campaign.title}
                  </h3>
                  <div className="space-y-2">
                    <Progress
                      value={(campaign.raised / campaign.goal) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Raised: ${campaign.raised.toLocaleString()}
                      </span>
                      <span className="font-medium">
                        Goal: ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Donate Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
