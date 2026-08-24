import React from 'react';
import { 
  Users, 
  CheckSquare, 
  ShieldCheck, 
  BarChart2, 
  DollarSign, 
  Wrench 
} from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <Users size={22} style={{ color: '#22c55e' }} />,
      title: "4,000+ TRADER COMMUNITY",
      description: "Real traders share real results in our SGA Trading Discord. Every firm review and discount code gets stress-tested by the community before it lands on this site. Join free at our Discord and enter monthly free prop firm giveaways open to every member."
    },
    {
      id: 2,
      icon: <CheckSquare size={22} style={{ color: '#22c55e' }} />,
      title: "24 FIRMS, HAND-VERIFIED MONTHLY",
      description: "Every futures prop firm review is hand-tested against live firm rules — payout speeds, drawdown calculations, evaluation pricing, and platform integrations across Apex, Tradeify, Take Profit Trader, Lucid Trading, and 20 more. Plus 255 account plans scored individually and country-specific guides for 50+ countries."
    },
    {
      id: 3,
      icon: <ShieldCheck size={22} style={{ color: '#22c55e' }} />,
      title: "FOUNDER-VETTED FIRMS ONLY",
      description: "Our founder Sheshu Gundla — a full-time funded trader featured on Topstep TV with $700,000+ in verified payouts across $5M+ of funded capital since 2023 — personally vets every firm before listing. Firms that fail due diligence get a red flag warning on their review page so you know exactly what you're walking into."
    },
    {
      id: 4,
      icon: <BarChart2 size={22} style={{ color: '#22c55e' }} />,
      title: "TRANSPARENT SGA SCORE RANKINGS",
      description: "Our Best Futures Prop Firms rankings are re-scored every month using a transparent algorithm — SGA Score weighs payout speed, drawdown buffer, profit split, and rule fairness so you see exactly why one plan beats another. Shopping by price instead? Start with the cheapest futures prop firms sorted by total cost after discount."
    },
    {
      id: 5,
      icon: <DollarSign size={22} style={{ color: '#22c55e' }} />,
      title: "VERIFIED DISCOUNT CODES",
      description: "Save up to 90% on evaluations with code SGA or DGT at every partnered firm — codes tested monthly so they actually work at checkout. Install our free browser extension to auto-apply SGA across 20+ firm websites, or browse all live prop firm discounts in one place."
    },
    {
      id: 6,
      icon: <Wrench size={22} style={{ color: '#22c55e' }} />,
      title: "FREE TOOLS & 146-TERM GLOSSARY",
      description: "We build the tools we wish existed — like our Consistency Rule Calculator, Evaluation Cost Calculator, and free TradingView indicators. Plus a 146-term trading glossary covering every drawdown type, payout condition, and prop firm rule you'll hit."
    }
  ];

  return (
    <section style={{ background: '#090d16', padding: '64px 20px', color: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '800', 
            letterSpacing: '1px', 
            color: '#ffffff',
            marginBottom: '14px',
            textTransform: 'uppercase' 
          }}>
            WHY TRADERS TRUST SGA ACADEMY
          </h2>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '0.98rem', 
            lineHeight: '1.6', 
            margin: 0 
          }}>
            We cut through the hype with verified reviews of every major <span style={{ color: '#22c55e', fontWeight: '600' }}>futures prop firm</span>, real-tested discount codes, and free tools like our <span style={{ color: '#22c55e', fontWeight: '600' }}>Consistency Rule Calculator</span> and <span style={{ color: '#22c55e', fontWeight: '600' }}>Evaluation Cost Calculator</span> — backed by <span style={{ color: '#ffffff', fontWeight: '700' }}>$700,000+</span> in verified payouts and a <span style={{ color: '#ffffff', fontWeight: '700' }}>4,000+</span> trader Discord community.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px' 
        }}>
          {features.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                background: '#111827', 
                border: '1px solid #1e293b', 
                borderRadius: '14px', 
                padding: '24px', 
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '10px', 
                background: 'rgba(34, 197, 94, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {item.icon}
              </div>

              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '800', 
                color: '#ffffff', 
                margin: 0, 
                letterSpacing: '0.5px' 
              }}>
                {item.title}
              </h3>

              <p style={{ 
                fontSize: '0.86rem', 
                color: '#94a3b8', 
                lineHeight: '1.6', 
                margin: 0 
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
