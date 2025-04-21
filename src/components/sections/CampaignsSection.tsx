
import CampaignCard from "../cards/CampaignCard";
import SectionHeader from "../sections/SectionHeader";

interface Campaign {
  title: string;
  image: string;
  raised: number;
  goal: number;
}

const campaigns: Campaign[] = [
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
];

export default function CampaignsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Featured Projects"
          title="Current Campaigns"
          description="Support these verified campaigns and make a real difference in people's lives."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.title}
              campaign={campaign}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
