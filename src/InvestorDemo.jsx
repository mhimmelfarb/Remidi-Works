import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// HG Partners Brand Colors
const colors = {
  navy: '#3D5A80',
  coral: '#EE6C4D',
  lightBlue: '#98C1D9',
  darkNavy: '#293241',
  cream: '#E0FBFC',
  white: '#FFFFFF',
  red: '#C1292E',
  yellow: '#F4A300',
  green: '#2D936C'
};

// Universe benchmark baseline
const UNIVERSE_AVG = 5.8;

// Peer benchmarks for contributor metrics
const PEER_BENCHMARKS = {
  nrr: 108,
  grr: 91,
  winRate: 28,
  salesCycle: 52,
  cac: 32000,
  ltv: 145000
};

// Default portfolio metadata
const defaultMeta = {
  fundName: "Apex Growth Partners II",
  fundType: "Growth Equity",
  lastUpdated: "2025-01-15"
};

// Helper functions
const formatCurrency = (num) => num >= 1000000 ? `$${(num / 1000000).toFixed(1)}M` : `$${(num / 1000).toFixed(0)}K`;
const getLtvCacIndex = (c) => ((c.ltv / c.cac) - (PEER_BENCHMARKS.ltv / PEER_BENCHMARKS.cac)).toFixed(1);

const getStatus = (indexed, thresholds = { red: -8, yellow: 0 }) => {
  if (indexed <= thresholds.red) return 'red';
  if (indexed <= thresholds.yellow) return 'yellow';
  return 'green';
};

const statusColors = { red: colors.red, yellow: colors.yellow, green: colors.green };

// Default portfolio data - 10 companies with full contributor metrics
const defaultPortfolioData = [
  { 
    id: 1, name: 'CloudSync Pro', sector: 'DevOps/Infrastructure', stage: 'Series B', 
    healthScore: 7.8, relativeScore: 2.0,
    valueArticulation: 8.2, pricingArchitecture: 7.5, competitivePositioning: 7.9, salesEnablement: 6.8, customerROI: 8.5,
    status: 'outperformer', invested: 2022,
    arr: 18500000, nrr: 112, grr: 94, winRate: 32, salesCycle: 45, cac: 28000, ltv: 168000,
    estimatedUpside: 925000, priority: 'low',
    topGaps: [], topOpportunities: []
  },
  { 
    id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A', 
    healthScore: 5.4, relativeScore: -0.4,
    valueArticulation: 4.8, pricingArchitecture: 5.2, competitivePositioning: 6.1, salesEnablement: 4.5, customerROI: 6.4,
    status: 'underperformer', invested: 2023,
    arr: 8200000, nrr: 98, grr: 88, winRate: 18, salesCycle: 78, cac: 42000, ltv: 118000,
    estimatedUpside: 1850000, priority: 'high',
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.5, issue: 'No ROI calculator or quantified proof points on website' },
      { dimension: 'Value Articulation', score: 4.8, issue: 'Features described but customer outcomes not quantified' },
      { dimension: 'Pricing Architecture', score: 5.2, issue: 'Flat per-seat pricing doesn\'t scale with value delivered' }
    ],
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 4.5, targetScore: 6.5, metric: 'Win Rate', impact: '+6%', arrImpact: 492000, description: 'No ROI calculator or quantified proof points' },
      { dimension: 'Value Articulation', currentScore: 4.8, targetScore: 6.5, metric: 'Sales Cycle', impact: '-18 days', arrImpact: 410000, description: 'Features described but outcomes not quantified' }
    ]
  },
  { 
    id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C', 
    healthScore: 8.1, relativeScore: 2.3,
    valueArticulation: 8.5, pricingArchitecture: 8.0, competitivePositioning: 8.3, salesEnablement: 7.8, customerROI: 7.9,
    status: 'outperformer', invested: 2021,
    arr: 32000000, nrr: 118, grr: 96, winRate: 35, salesCycle: 38, cac: 26000, ltv: 195000,
    estimatedUpside: 640000, priority: 'low',
    topGaps: [], topOpportunities: []
  },
  { 
    id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A', 
    healthScore: 4.2, relativeScore: -1.6,
    valueArticulation: 3.5, pricingArchitecture: 4.8, competitivePositioning: 4.9, salesEnablement: 3.2, customerROI: 4.6,
    status: 'underperformer', invested: 2023,
    arr: 6800000, nrr: 91, grr: 82, winRate: 14, salesCycle: 92, cac: 48000, ltv: 96000,
    estimatedUpside: 2380000, priority: 'critical',
    topGaps: [
      { dimension: 'Sales Enablement', score: 3.2, issue: 'No published pricing, no case studies with quantified ROI' },
      { dimension: 'Value Articulation', score: 3.5, issue: 'Operational stats shown but no connection to customer P&L impact' },
      { dimension: 'Customer ROI Proof', score: 4.6, issue: 'Claims savings but no calculator or specific customer evidence' }
    ],
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 3.2, targetScore: 6.0, metric: 'Win Rate', impact: '+9%', arrImpact: 856000, description: 'Build ROI calculator, publish case studies with quantified outcomes' },
      { dimension: 'Value Articulation', currentScore: 3.5, targetScore: 6.0, metric: 'Sales Cycle', impact: '-28 days', arrImpact: 680000, description: 'Connect operational metrics to customer P&L impact' },
      { dimension: 'Customer ROI Proof', currentScore: 4.6, targetScore: 7.0, metric: 'NRR', impact: '+8%', arrImpact: 544000, description: 'Create segment-specific value stories with evidence' }
    ]
  },
  { 
    id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B', 
    healthScore: 6.3, relativeScore: 0.5,
    valueArticulation: 6.8, pricingArchitecture: 5.5, competitivePositioning: 6.2, salesEnablement: 6.5, customerROI: 6.5,
    status: 'on-track', invested: 2022,
    arr: 12400000, nrr: 104, grr: 90, winRate: 24, salesCycle: 58, cac: 35000, ltv: 140000,
    estimatedUpside: 1116000, priority: 'medium',
    topGaps: [],
    topOpportunities: [
      { dimension: 'Pricing Architecture', currentScore: 5.5, targetScore: 7.0, metric: 'NRR', impact: '+3%', arrImpact: 372000, description: 'Usage-based upsell opportunities not captured' }
    ]
  },
  { 
    id: 6, name: 'PayStream', sector: 'FinTech', stage: 'Series B', 
    healthScore: 7.2, relativeScore: 1.4,
    valueArticulation: 7.5, pricingArchitecture: 7.8, competitivePositioning: 6.8, salesEnablement: 7.0, customerROI: 6.9,
    status: 'outperformer', invested: 2021,
    arr: 21000000, nrr: 110, grr: 93, winRate: 30, salesCycle: 48, cac: 30000, ltv: 156000,
    estimatedUpside: 840000, priority: 'low',
    topGaps: [], topOpportunities: []
  },
  { 
    id: 7, name: 'HealthBridge', sector: 'HealthTech', stage: 'Series A', 
    healthScore: 5.1, relativeScore: -0.7,
    valueArticulation: 5.5, pricingArchitecture: 4.2, competitivePositioning: 5.8, salesEnablement: 4.8, customerROI: 5.2,
    status: 'underperformer', invested: 2024,
    arr: 5200000, nrr: 96, grr: 86, winRate: 19, salesCycle: 85, cac: 52000, ltv: 104000,
    estimatedUpside: 1196000, priority: 'high',
    topGaps: [
      { dimension: 'Pricing Architecture', score: 4.2, issue: 'Single flat-rate tier regardless of practice size or usage' },
      { dimension: 'Sales Enablement', score: 4.8, issue: 'Limited competitive positioning materials visible' },
      { dimension: 'Customer ROI Proof', score: 5.2, issue: 'Testimonials but no quantified outcomes' }
    ],
    topOpportunities: [
      { dimension: 'Pricing Architecture', currentScore: 4.2, targetScore: 6.5, metric: 'NRR', impact: '+6%', arrImpact: 520000, description: 'Single flat-rate tier regardless of practice size' }
    ]
  },
  { 
    id: 8, name: 'RetailIQ', sector: 'Retail Analytics', stage: 'Series B', 
    healthScore: 6.8, relativeScore: 1.0,
    valueArticulation: 7.2, pricingArchitecture: 6.5, competitivePositioning: 6.9, salesEnablement: 6.2, customerROI: 7.2,
    status: 'on-track', invested: 2022,
    arr: 14200000, nrr: 106, grr: 91, winRate: 26, salesCycle: 55, cac: 34000, ltv: 148000,
    estimatedUpside: 994000, priority: 'medium',
    topGaps: [], topOpportunities: []
  },
  { 
    id: 9, name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B', 
    healthScore: 5.5, relativeScore: -0.3,
    valueArticulation: 5.2, pricingArchitecture: 6.8, competitivePositioning: 5.5, salesEnablement: 4.8, customerROI: 5.2,
    status: 'underperformer', invested: 2021,
    arr: 11800000, nrr: 100, grr: 89, winRate: 21, salesCycle: 68, cac: 38000, ltv: 132000,
    estimatedUpside: 1534000, priority: 'high',
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.8, issue: 'No visible battle cards or competitive differentiation content' },
      { dimension: 'Value Articulation', score: 5.2, issue: 'Generic efficiency claims without segment-specific proof' },
      { dimension: 'Customer ROI Proof', score: 5.2, issue: 'Case studies lack specific financial outcomes' }
    ],
    topOpportunities: [
      { dimension: 'Competitive Positioning', currentScore: 5.5, targetScore: 7.0, metric: 'Win Rate', impact: '+5%', arrImpact: 590000, description: 'No visible battle cards or competitive differentiation' }
    ]
  },
  { 
    id: 10, name: 'MarketPulse', sector: 'MarTech', stage: 'Series A', 
    healthScore: 6.5, relativeScore: 0.7,
    valueArticulation: 6.9, pricingArchitecture: 6.2, competitivePositioning: 6.8, salesEnablement: 5.8, customerROI: 6.8,
    status: 'on-track', invested: 2023,
    arr: 7500000, nrr: 105, grr: 90, winRate: 25, salesCycle: 54, cac: 33000, ltv: 142000,
    estimatedUpside: 825000, priority: 'medium',
    topGaps: [], topOpportunities: []
  }
];

// Mini gauge component
const MiniGauge = ({ score, size = 60 }) => {
  const percentage = (score / 10) * 100;
  const getColor = (s) => s >= 7 ? colors.green : s >= 5.5 ? colors.yellow : colors.red;
  const radius = size / 2 - 4;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
      <path d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`} fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
      <path d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`} fill="none" stroke={getColor(score)} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={colors.darkNavy}>{score.toFixed(1)}</text>
    </svg>
  );
};

// Score bar component
const ScoreBar = ({ score, label, compact = false }) => {
  const getColor = (s) => s >= 7 ? colors.green : s >= 5.5 ? colors.yellow : colors.red;
  return (
    <div style={{ marginBottom: compact ? '6px' : '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: compact ? '10px' : '11px', color: '#6b7280' }}>{label}</span>
        <span style={{ fontSize: compact ? '10px' : '11px', fontWeight: 600, color: colors.darkNavy }}>{score.toFixed(1)}</span>
      </div>
      <div style={{ height: compact ? '4px' : '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score * 10}%`, backgroundColor: getColor(score), borderRadius: '3px', transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
};

// Indexed metric cell component
const IndexCell = ({ value, unit = '', inverse = false, thresholds = { red: -8, yellow: 0 } }) => {
  const numValue = parseFloat(value);
  const status = getStatus(inverse ? -numValue : numValue, thresholds);
  const displayValue = numValue > 0 ? `+${value}` : value;
  return <span style={{ fontSize: '14px', fontWeight: 600, color: statusColors[status] }}>{displayValue}{unit}</span>;
};

// Status dot component
const StatusDot = ({ status }) => (
  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: statusColors[status], marginRight: '6px' }}/>
);

// Indexed bar for board slide
const IndexedBar = ({ label, value, unit = '', inverse = false }) => {
  const maxDeviation = 30;
  const numValue = parseFloat(value);
  const normalizedValue = Math.max(-maxDeviation, Math.min(maxDeviation, numValue));
  const percentage = (Math.abs(normalizedValue) / maxDeviation) * 50;
  const isPositive = inverse ? numValue < 0 : numValue > 0;
  const status = getStatus(inverse ? -numValue : numValue, { red: -8, yellow: 0 });
  
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusDot status={status} />
          <span style={{ fontSize: '13px', fontWeight: 500, color: colors.darkNavy }}>{label}</span>
        </div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: statusColors[status] }}>{numValue > 0 ? '+' : ''}{value}{unit}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', height: '10px' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {!isPositive && <div style={{ width: `${percentage}%`, height: '10px', backgroundColor: statusColors[status], borderRadius: '5px 0 0 5px' }}/>}
        </div>
        <div style={{ width: '2px', height: '14px', backgroundColor: '#9ca3af', margin: '0 1px' }}/>
        <div style={{ flex: 1 }}>
          {isPositive && <div style={{ width: `${percentage}%`, height: '10px', backgroundColor: statusColors[status], borderRadius: '0 5px 5px 0' }}/>}
        </div>
      </div>
    </div>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const configs = { critical: { bg: '#fee2e2', text: '#991b1b' }, high: { bg: '#fef3c7', text: '#92400e' }, medium: { bg: '#e0f2fe', text: '#0369a1' }, low: { bg: '#dcfce7', text: '#166534' } };
  const config = configs[priority] || configs.medium;
  return <span style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, borderRadius: '4px', backgroundColor: config.bg, color: config.text, textTransform: 'uppercase' }}>{priority}</span>;
};

// ============ ADVANCED ANALYSIS VIEW ============
const AdvancedAnalysis = ({ company, onBack, onViewBoard, fundName }) => {
  const healthIndex = (company.healthScore - UNIVERSE_AVG).toFixed(1);
  const nrrIndex = company.nrr - PEER_BENCHMARKS.nrr;
  const grrIndex = company.grr - PEER_BENCHMARKS.grr;
  const winIndex = company.winRate - PEER_BENCHMARKS.winRate;
  const cycleIndex = company.salesCycle - PEER_BENCHMARKS.salesCycle;
  const ltvCacIndex = getLtvCacIndex(company);
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <header style={{ backgroundColor: colors.navy, padding: '16px 24px', borderBottom: `3px solid ${colors.coral}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: colors.coral, width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>RW</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Remidi Works</span>
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '8px' }}>Advanced Analysis</span>
          </div>
          <span style={{ color: '#fff', fontSize: '13px' }}>{fundName}</span>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 18px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: colors.darkNavy }}>← Back to Portfolio</button>

        {/* Company Header */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <MiniGauge score={company.healthScore} size={80} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</span>
                <PriorityBadge priority={company.priority} />
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>{company.sector} • {company.stage} • {formatCurrency(company.arr)} ARR</div>
              <div style={{ fontSize: '13px', marginTop: '8px' }}>
                <span style={{ color: '#6b7280' }}>vs. Universe: </span>
                <IndexCell value={parseFloat(healthIndex)} unit=" pts" thresholds={{ red: -1.5, yellow: 0 }} />
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: colors.cream, borderRadius: '10px', padding: '20px 28px', borderLeft: `4px solid ${colors.coral}`, textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Estimated Revenue Upside</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: colors.coral }}>{formatCurrency(company.estimatedUpside)}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{((company.estimatedUpside / company.arr) * 100).toFixed(0)}% of current ARR</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left: Commercial Health + Indexed Metrics */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>Commercial Health Analysis</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '20px' }}>Based on public-facing materials assessment</div>
            
            <ScoreBar score={company.valueArticulation} label="Value Articulation" />
            <ScoreBar score={company.pricingArchitecture} label="Pricing Architecture" />
            <ScoreBar score={company.competitivePositioning} label="Competitive Positioning" />
            <ScoreBar score={company.salesEnablement} label="Sales Enablement" />
            <ScoreBar score={company.customerROI} label="Customer ROI Proof" />
            
            {/* Performance vs Universe */}
            <div style={{ marginTop: '24px', padding: '18px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: `3px solid ${colors.navy}` }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '4px' }}>Performance vs. Universe</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '14px' }}>Contributed metrics indexed to peer median</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>NRR</span>
                  <IndexCell value={nrrIndex} unit="%" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>GRR</span>
                  <IndexCell value={grrIndex} unit="%" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Win Rate</span>
                  <IndexCell value={winIndex} unit="%" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Sales Cycle</span>
                  <IndexCell value={cycleIndex} unit="d" inverse={true} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>LTV/CAC</span>
                  <IndexCell value={parseFloat(ltvCacIndex)} unit="x" thresholds={{ red: -1, yellow: 0 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Prioritized Opportunities */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>Prioritized Improvement Opportunities</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>Ranked by estimated ARR impact</div>
            
            {company.topOpportunities && company.topOpportunities.length > 0 ? company.topOpportunities.map((opp, idx) => (
              <div key={idx} style={{ padding: '18px', backgroundColor: idx === 0 ? '#fef3c7' : '#f9fafb', borderRadius: '8px', marginBottom: '14px', border: idx === 0 ? `1px solid ${colors.yellow}` : '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>#{idx + 1} Priority</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: colors.darkNavy }}>{opp.dimension}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: colors.green }}>{formatCurrency(opp.arrImpact)}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>potential ARR</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '14px', lineHeight: 1.5 }}>{opp.description}</div>
                <div style={{ display: 'flex', gap: '20px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>Score</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy }}>{opp.currentScore} → {opp.targetScore}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{opp.metric}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: colors.green }}>{opp.impact}</div>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ padding: '40px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', color: colors.green, fontWeight: 600 }}>✓ Strong Commercial Health</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>No critical gaps identified</div>
              </div>
            )}
            
            {/* Board Slide Button */}
            <div style={{ marginTop: '24px', padding: '20px', backgroundColor: colors.navy, borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>Board Status Report</div>
              <div style={{ fontSize: '12px', color: colors.lightBlue, marginBottom: '14px' }}>Export-ready slide showing commercial health progress for board presentations</div>
              <button onClick={() => onViewBoard(company)} style={{ width: '100%', padding: '14px', backgroundColor: colors.coral, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>View Board Slide →</button>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', fontSize: '12px', color: '#6b7280' }}>
          <strong style={{ color: colors.darkNavy }}>Methodology:</strong> Upside estimates based on correlation analysis between commercial health dimensions and contributed performance metrics across 100+ B2B technology companies.
        </div>
      </main>
    </div>
  );
};

// ============ BOARD SLIDE VIEW ============
const BoardSlide = ({ company, onBack, fundName }) => {
  const nrrIndex = company.nrr - PEER_BENCHMARKS.nrr;
  const grrIndex = company.grr - PEER_BENCHMARKS.grr;
  const winIndex = company.winRate - PEER_BENCHMARKS.winRate;
  const cycleIndex = company.salesCycle - PEER_BENCHMARKS.salesCycle;
  const ltvCacIndex = getLtvCacIndex(company);

  const metrics = [
    { label: 'NRR', value: nrrIndex, unit: '%' },
    { label: 'GRR', value: grrIndex, unit: '%' },
    { label: 'Win Rate', value: winIndex, unit: '%' },
    { label: 'Sales Cycle', value: cycleIndex, unit: 'd', inverse: true },
    { label: 'LTV/CAC', value: ltvCacIndex, unit: 'x' },
  ];

  const redCount = metrics.filter(m => getStatus(m.inverse ? -parseFloat(m.value) : parseFloat(m.value), { red: -8, yellow: 0 }) === 'red').length;
  const yellowCount = metrics.filter(m => getStatus(m.inverse ? -parseFloat(m.value) : parseFloat(m.value), { red: -8, yellow: 0 }) === 'yellow').length;
  const greenCount = metrics.filter(m => getStatus(m.inverse ? -parseFloat(m.value) : parseFloat(m.value), { red: -8, yellow: 0 }) === 'green').length;
  const totalOpportunity = company.topOpportunities ? company.topOpportunities.reduce((s, o) => s + o.arrImpact, 0) : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <header style={{ backgroundColor: colors.navy, padding: '16px 24px', borderBottom: `3px solid ${colors.coral}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: colors.coral, width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>RW</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Remidi Works</span>
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '8px' }}>Board Report</span>
          </div>
          <span style={{ color: '#fff', fontSize: '13px' }}>{fundName}</span>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
        <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 18px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: colors.darkNavy }}>← Back to Analysis</button>

        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Board Slide Preview • Ready for Export</div>

        {/* The Board Slide */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          {/* Slide Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Commercial Health Status Report</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>{company.sector} • {formatCurrency(company.arr)} ARR • Q1 2025</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: colors.red, display: 'inline-block' }}/>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>{redCount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: colors.yellow, display: 'inline-block' }}/>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>{yellowCount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: colors.green, display: 'inline-block' }}/>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>{greenCount}</span>
                </div>
              </div>
              <div style={{ backgroundColor: colors.cream, padding: '14px 18px', borderRadius: '8px', borderLeft: `4px solid ${colors.coral}` }}>
                <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase' }}>Addressable Upside</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: colors.coral }}>{formatCurrency(company.estimatedUpside)}</div>
              </div>
            </div>
          </div>

          {/* Two Column Main Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Left: Performance vs Universe */}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>Performance vs. Universe</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '20px' }}>Index: 0 = median • Left = below • Right = above</div>
              {metrics.map((m, i) => <IndexedBar key={i} label={m.label} value={m.value} unit={m.unit} inverse={m.inverse} />)}
            </div>

            {/* Right: Priority Actions */}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>Priority Actions</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '20px' }}>Ranked by estimated ARR impact</div>
              
              {company.topOpportunities && company.topOpportunities.length > 0 ? company.topOpportunities.map((opp, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: idx === 0 ? '#fef3c7' : '#f9fafb', borderRadius: '6px', marginBottom: '10px', borderLeft: `4px solid ${idx === 0 ? colors.yellow : '#e5e7eb'}` }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>{opp.dimension}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{opp.impact}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: colors.green }}>{formatCurrency(opp.arrImpact)}</div>
                </div>
              )) : (
                <div style={{ padding: '28px', backgroundColor: '#f9fafb', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '15px', color: colors.green, fontWeight: 600 }}>✓ No Critical Gaps</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Commercial health on track</div>
                </div>
              )}
              
              {totalOpportunity > 0 && (
                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: colors.navy, borderRadius: '8px', color: '#fff' }}>
                  <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase' }}>Total Opportunity</div>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>{formatCurrency(totalOpportunity)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Slide Footer */}
          <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af' }}>
            <span>Remidi Works • Commercial Health Intelligence</span>
            <span>Q1 2025 • {fundName}</span>
          </div>
        </div>

        {/* Export Actions */}
        <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            <strong style={{ color: colors.darkNavy }}>Export Options:</strong> Download as PDF or PowerPoint for board presentations
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: colors.darkNavy }}>Download PDF</button>
            <button style={{ padding: '10px 20px', backgroundColor: colors.coral, border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#fff' }}>Download PPTX</button>
          </div>
        </div>
      </main>
    </div>
  );
};

// ============ MAIN INVESTOR DEMO COMPONENT ============
const InvestorDemo = () => {
  const [searchParams] = useSearchParams();
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [meta, setMeta] = useState(defaultMeta);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showSizeModal, setShowSizeModal] = useState(null);
  const [view, setView] = useState('portfolio');
  const [analysisCompany, setAnalysisCompany] = useState(null);

  useEffect(() => {
    const clientId = searchParams.get('client');
    if (clientId) {
      fetch(`/data/${clientId}.json`).then(res => res.json()).then(data => {
        if (data.portfolio) setPortfolioData(data.portfolio);
        if (data.meta) setMeta(data.meta);
      }).catch(() => console.log('Using default portfolio data'));
    }
  }, [searchParams]);

  const avgHealthScore = portfolioData.reduce((sum, c) => sum + c.healthScore, 0) / portfolioData.length;
  const totalUpside = portfolioData.reduce((sum, c) => sum + (c.estimatedUpside || 0), 0);
  const totalARR = portfolioData.reduce((sum, c) => sum + (c.arr || 0), 0);
  const outperformers = portfolioData.filter(c => c.status === 'outperformer').length;
  const underperformers = portfolioData.filter(c => c.status === 'underperformer').length;
  
  const dimAverages = {
    valueArticulation: portfolioData.reduce((s, c) => s + c.valueArticulation, 0) / portfolioData.length,
    pricingArchitecture: portfolioData.reduce((s, c) => s + c.pricingArchitecture, 0) / portfolioData.length,
    competitivePositioning: portfolioData.reduce((s, c) => s + c.competitivePositioning, 0) / portfolioData.length,
    salesEnablement: portfolioData.reduce((s, c) => s + c.salesEnablement, 0) / portfolioData.length,
    customerROI: portfolioData.reduce((s, c) => s + c.customerROI, 0) / portfolioData.length
  };

  const handleViewAnalysis = (company) => { setAnalysisCompany(company); setView('analysis'); };
  const handleViewBoard = (company) => { setAnalysisCompany(company); setView('board'); };
  const handleBackToPortfolio = () => { setView('portfolio'); setAnalysisCompany(null); };
  const handleBackToAnalysis = () => { setView('analysis'); };

  if (view === 'analysis' && analysisCompany) {
    return <AdvancedAnalysis company={analysisCompany} onBack={handleBackToPortfolio} onViewBoard={handleViewBoard} fundName={meta.fundName} />;
  }

  if (view === 'board' && analysisCompany) {
    return <BoardSlide company={analysisCompany} onBack={handleBackToAnalysis} fundName={meta.fundName} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <header style={{ backgroundColor: colors.navy, padding: '16px 24px', borderBottom: `3px solid ${colors.coral}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: colors.coral, width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>RW</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Remidi Works</span>
            </Link>
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '8px' }}>Investor Demo</span>
          </div>
          <span style={{ color: '#fff', fontSize: '13px' }}>{meta.fundName}</span>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Portfolio Health</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MiniGauge score={avgHealthScore} size={56} />
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>vs. Universe</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: avgHealthScore > UNIVERSE_AVG ? colors.green : colors.red }}>{avgHealthScore > UNIVERSE_AVG ? '+' : ''}{(avgHealthScore - UNIVERSE_AVG).toFixed(1)} pts</div>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Total Addressable Upside</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: colors.coral }}>{formatCurrency(totalUpside)}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{totalARR > 0 ? ((totalUpside / totalARR) * 100).toFixed(0) : 0}% of portfolio ARR</div>
          </div>
          
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Outperformers</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: colors.green }}>{outperformers}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>of {portfolioData.length} companies</div>
          </div>
          
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Need Attention</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: colors.red }}>{underperformers}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>below universe median</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Portfolio Table */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: colors.darkNavy }}>Portfolio Companies</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Click a row to view details • Ranked by health score</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
              <div>Company</div>
              <div style={{ textAlign: 'center' }}>Health Score</div>
              <div style={{ textAlign: 'center' }}>vs. Universe</div>
              <div style={{ textAlign: 'center' }}>Status</div>
            </div>
            
            {[...portfolioData].sort((a, b) => b.healthScore - a.healthScore).map((company) => (
              <div key={company.id} onClick={() => setSelectedCompany(selectedCompany?.id === company.id ? null : company)} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', backgroundColor: selectedCompany?.id === company.id ? colors.cream : '#fff', transition: 'background-color 0.15s ease' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>{company.name}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{company.sector}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><MiniGauge score={company.healthScore} size={44} /></div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: company.relativeScore > 0 ? colors.green : company.relativeScore < -1 ? colors.red : colors.yellow }}>{company.relativeScore > 0 ? '+' : ''}{company.relativeScore.toFixed(1)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, backgroundColor: company.status === 'outperformer' ? '#dcfce7' : company.status === 'underperformer' ? '#fee2e2' : '#fef3c7', color: company.status === 'outperformer' ? '#166534' : company.status === 'underperformer' ? '#991b1b' : '#92400e' }}>
                    {company.status === 'outperformer' ? 'Strong' : company.status === 'underperformer' ? 'At Risk' : 'On Track'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div>
            {selectedCompany ? (
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>{selectedCompany.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{selectedCompany.sector} • {selectedCompany.stage}</div>
                    </div>
                    <MiniGauge score={selectedCompany.healthScore} size={52} />
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '14px' }}>Dimension Scores</div>
                  <ScoreBar score={selectedCompany.valueArticulation} label="Value Articulation" compact />
                  <ScoreBar score={selectedCompany.pricingArchitecture} label="Pricing Architecture" compact />
                  <ScoreBar score={selectedCompany.competitivePositioning} label="Competitive Positioning" compact />
                  <ScoreBar score={selectedCompany.salesEnablement} label="Sales Enablement" compact />
                  <ScoreBar score={selectedCompany.customerROI} label="Customer ROI Proof" compact />
                  
                  {selectedCompany.topGaps.length > 0 && (
                    <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px', fontSize: '12px', color: '#92400e' }}>
                      <strong>Primary Gap:</strong> {selectedCompany.topGaps[0]?.dimension}
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '0 20px 20px' }}>
                  <button onClick={() => handleViewAnalysis(selectedCompany)} style={{ width: '100%', padding: '12px', backgroundColor: colors.navy, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '10px' }}>View Advanced Analysis →</button>
                  
                  {selectedCompany.id === 4 ? (
                    <Link to="/user" style={{ textDecoration: 'none' }}>
                      <button style={{ width: '100%', padding: '12px', backgroundColor: colors.coral, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Run Diagnostic Interview →</button>
                    </Link>
                  ) : (
                    <button onClick={() => setShowSizeModal(selectedCompany)} style={{ width: '100%', padding: '12px', backgroundColor: selectedCompany.status === 'underperformer' ? colors.coral : '#f3f4f6', color: selectedCompany.status === 'underperformer' ? '#fff' : colors.darkNavy, border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                      {selectedCompany.status === 'underperformer' ? 'Size This Opportunity →' : 'Request Detailed Diagnostic →'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Portfolio Dimension Averages</div>
                <ScoreBar score={dimAverages.valueArticulation} label="Value Articulation" />
                <ScoreBar score={dimAverages.pricingArchitecture} label="Pricing Architecture" />
                <ScoreBar score={dimAverages.competitivePositioning} label="Competitive Positioning" />
                <ScoreBar score={dimAverages.salesEnablement} label="Sales Enablement" />
                <ScoreBar score={dimAverages.customerROI} label="Customer ROI Proof" />
                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>
                  <strong style={{ color: colors.darkNavy }}>How to use:</strong> Click on any company to see detailed dimension scores and access advanced analysis with quantified improvement opportunities.
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div style={{ marginTop: '24px', padding: '16px 20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}><strong style={{ color: colors.darkNavy }}>Methodology:</strong> Scores derived from analysis of public-facing materials. Universe benchmark based on 100+ B2B technology companies.</div>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>Last updated: {meta.lastUpdated}</div>
        </div>
      </main>

      {/* Size Opportunity Modal */}
      {showSizeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '32px', maxWidth: '480px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>Advanced Analysis Available</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px', lineHeight: 1.6 }}>To unlock quantified opportunity sizing and board-ready reports for <strong>{showSizeModal.name}</strong>, contribute your performance metrics (NRR, GRR, Win Rate, Sales Cycle, LTV/CAC).</div>
            
            <div style={{ padding: '16px', backgroundColor: colors.cream, borderRadius: '8px', marginBottom: '24px', borderLeft: `3px solid ${colors.coral}` }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy, marginBottom: '8px' }}>What you'll get:</div>
              <ul style={{ fontSize: '12px', color: '#4b5563', margin: 0, paddingLeft: '18px', lineHeight: 1.8 }}>
                <li>Indexed performance vs. peer universe</li>
                <li>Quantified ARR upside by dimension</li>
                <li>Prioritized action plan with expected impact</li>
                <li>Board-ready status report</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowSizeModal(null)} style={{ flex: 1, padding: '12px', backgroundColor: '#f3f4f6', color: colors.darkNavy, border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Maybe Later</button>
              <button onClick={() => { handleViewAnalysis(showSizeModal); setShowSizeModal(null); }} style={{ flex: 1, padding: '12px', backgroundColor: colors.coral, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>View Demo Analysis</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorDemo;
