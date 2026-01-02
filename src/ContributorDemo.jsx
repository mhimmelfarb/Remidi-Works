import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const colors = {
  navy: '#3D5A80',
  coral: '#EE6C4D',
  lightBlue: '#98C1D9',
  darkNavy: '#293241',
  cream: '#E0FBFC',
  red: '#C1292E',
  yellow: '#F4A300',
  green: '#2D936C'
};

// Portfolio data - metrics correlate with health scores
const portfolioData = [
  { 
    id: 'fleetops', name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A',
    arr: 6800000,
    healthScore: 4.2, peerHealthScore: 6.3,
    nrr: 94, peerNrr: 108,
    grr: 88, peerGrr: 91,
    winRate: 16, peerWinRate: 28,
    salesCycle: 95, peerSalesCycle: 55,
    cac: 52000, peerCac: 35000,
    ltv: 98000, peerLtv: 140000,
    valueArticulation: 3.5, pricingArchitecture: 4.8, competitivePositioning: 4.9, salesEnablement: 3.2, customerROI: 4.6,
    estimatedUpside: 2380000, priority: 'critical',
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 3.2, targetScore: 6.0, metric: 'Win Rate', impact: '+8%', arrImpact: 856000, description: 'Build ROI calculator, publish case studies with quantified outcomes' },
      { dimension: 'Value Articulation', currentScore: 3.5, targetScore: 6.0, metric: 'Sales Cycle', impact: '-25 days', arrImpact: 680000, description: 'Connect operational metrics to customer P&L impact' },
      { dimension: 'Customer ROI Proof', currentScore: 4.6, targetScore: 7.0, metric: 'NRR', impact: '+6%', arrImpact: 544000, description: 'Create segment-specific value stories with evidence' }
    ]
  },
  { 
    id: 'dataforge', name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A',
    arr: 8200000,
    healthScore: 5.4, peerHealthScore: 6.3,
    nrr: 105, peerNrr: 108,
    grr: 89, peerGrr: 91,
    winRate: 21, peerWinRate: 28,
    salesCycle: 72, peerSalesCycle: 55,
    cac: 44000, peerCac: 35000,
    ltv: 125000, peerLtv: 140000,
    valueArticulation: 4.8, pricingArchitecture: 5.2, competitivePositioning: 6.1, salesEnablement: 4.5, customerROI: 6.4,
    estimatedUpside: 1850000, priority: 'high',
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 4.5, targetScore: 6.5, metric: 'Win Rate', impact: '+5%', arrImpact: 492000, description: 'No ROI calculator or quantified proof points' },
      { dimension: 'Value Articulation', currentScore: 4.8, targetScore: 6.5, metric: 'Sales Cycle', impact: '-12 days', arrImpact: 410000, description: 'Features described but outcomes not quantified' }
    ]
  },
  { 
    id: 'supplycore', name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B',
    arr: 11800000,
    healthScore: 5.5, peerHealthScore: 6.3,
    nrr: 104, peerNrr: 108,
    grr: 90, peerGrr: 91,
    winRate: 19, peerWinRate: 28,
    salesCycle: 62, peerSalesCycle: 55,
    cac: 39000, peerCac: 35000,
    ltv: 130000, peerLtv: 140000,
    valueArticulation: 5.2, pricingArchitecture: 6.8, competitivePositioning: 5.5, salesEnablement: 4.8, customerROI: 5.2,
    estimatedUpside: 1534000, priority: 'high',
    topOpportunities: [
      { dimension: 'Competitive Positioning', currentScore: 5.5, targetScore: 7.0, metric: 'Win Rate', impact: '+6%', arrImpact: 590000, description: 'No visible battle cards or competitive differentiation' }
    ]
  },
  { 
    id: 'healthbridge', name: 'HealthBridge', sector: 'HealthTech', stage: 'Series A',
    arr: 5200000,
    healthScore: 5.1, peerHealthScore: 6.3,
    nrr: 102, peerNrr: 108,
    grr: 87, peerGrr: 91,
    winRate: 22, peerWinRate: 28,
    salesCycle: 88, peerSalesCycle: 55,
    cac: 48000, peerCac: 35000,
    ltv: 108000, peerLtv: 140000,
    valueArticulation: 5.5, pricingArchitecture: 4.2, competitivePositioning: 5.8, salesEnablement: 4.8, customerROI: 5.2,
    estimatedUpside: 1196000, priority: 'high',
    topOpportunities: [
      { dimension: 'Pricing Architecture', currentScore: 4.2, targetScore: 6.5, metric: 'NRR', impact: '+5%', arrImpact: 520000, description: 'Single flat-rate tier regardless of practice size' }
    ]
  },
  { 
    id: 'talentmatch', name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B',
    arr: 12400000,
    healthScore: 6.3, peerHealthScore: 6.3,
    nrr: 106, peerNrr: 108,
    grr: 90, peerGrr: 91,
    winRate: 26, peerWinRate: 28,
    salesCycle: 58, peerSalesCycle: 55,
    cac: 36000, peerCac: 35000,
    ltv: 138000, peerLtv: 140000,
    valueArticulation: 6.8, pricingArchitecture: 5.5, competitivePositioning: 6.2, salesEnablement: 6.5, customerROI: 6.5,
    estimatedUpside: 1116000, priority: 'medium',
    topOpportunities: [
      { dimension: 'Pricing Architecture', currentScore: 5.5, targetScore: 7.0, metric: 'NRR', impact: '+3%', arrImpact: 372000, description: 'Usage-based upsell opportunities not captured' }
    ]
  },
  { 
    id: 'cloudsync', name: 'CloudSync Pro', sector: 'DevOps', stage: 'Series B',
    arr: 18500000,
    healthScore: 7.8, peerHealthScore: 6.3,
    nrr: 115, peerNrr: 108,
    grr: 94, peerGrr: 91,
    winRate: 34, peerWinRate: 28,
    salesCycle: 48, peerSalesCycle: 55,
    cac: 38000, peerCac: 35000,
    ltv: 165000, peerLtv: 140000,
    valueArticulation: 8.2, pricingArchitecture: 7.5, competitivePositioning: 7.9, salesEnablement: 6.8, customerROI: 8.5,
    estimatedUpside: 925000, priority: 'low',
    topOpportunities: []
  },
  { 
    id: 'paystream', name: 'PayStream', sector: 'FinTech', stage: 'Series B',
    arr: 21000000,
    healthScore: 7.2, peerHealthScore: 6.3,
    nrr: 112, peerNrr: 108,
    grr: 93, peerGrr: 91,
    winRate: 31, peerWinRate: 28,
    salesCycle: 52, peerSalesCycle: 55,
    cac: 33000, peerCac: 35000,
    ltv: 155000, peerLtv: 140000,
    valueArticulation: 7.5, pricingArchitecture: 7.8, competitivePositioning: 6.8, salesEnablement: 7.0, customerROI: 6.9,
    estimatedUpside: 840000, priority: 'low',
    topOpportunities: []
  },
  { 
    id: 'securevault', name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C',
    arr: 32000000,
    healthScore: 8.1, peerHealthScore: 6.3,
    nrr: 118, peerNrr: 108,
    grr: 95, peerGrr: 91,
    winRate: 36, peerWinRate: 28,
    salesCycle: 45, peerSalesCycle: 55,
    cac: 30000, peerCac: 35000,
    ltv: 175000, peerLtv: 140000,
    valueArticulation: 8.5, pricingArchitecture: 8.0, competitivePositioning: 8.3, salesEnablement: 7.8, customerROI: 7.9,
    estimatedUpside: 640000, priority: 'low',
    topOpportunities: []
  },
];

const sortedCompanies = [...portfolioData].sort((a, b) => {
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return priorityOrder[a.priority] - priorityOrder[b.priority] || b.estimatedUpside - a.estimatedUpside;
});

const formatCurrency = (num) => num >= 1000000 ? `$${(num / 1000000).toFixed(1)}M` : `$${(num / 1000).toFixed(0)}K`;

const getStatus = (indexed, thresholds = { red: -8, yellow: 0 }) => {
  if (indexed <= thresholds.red) return 'red';
  if (indexed <= thresholds.yellow) return 'yellow';
  return 'green';
};

const statusColors = { red: colors.red, yellow: colors.yellow, green: colors.green };

const getLtvCacIndex = (c) => ((c.ltv/c.cac) - (c.peerLtv/c.peerCac)).toFixed(1);

// Mini gauge
const MiniGauge = ({ score, size = 46 }) => {
  const getColor = (s) => s >= 7 ? colors.green : s >= 5.5 ? colors.yellow : colors.red;
  const radius = size / 2 - 4;
  const circumference = Math.PI * radius;
  const offset = circumference - ((score / 10) * circumference);
  
  return (
    <svg width={size} height={size / 2 + 8} viewBox={`0 0 ${size} ${size / 2 + 8}`}>
      <path d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`} fill="none" stroke="#e5e7eb" strokeWidth="5" strokeLinecap="round"/>
      <path d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`} fill="none" stroke={getColor(score)} strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}/>
      <text x={size / 2} y={size / 2 + 2} textAnchor="middle" fontSize="12" fontWeight="700" fill={colors.darkNavy}>{score.toFixed(1)}</text>
    </svg>
  );
};

// Priority badge
const PriorityBadge = ({ priority }) => {
  const configs = { critical: { bg: '#fee2e2', text: '#991b1b' }, high: { bg: '#fef3c7', text: '#92400e' }, medium: { bg: '#e0f2fe', text: '#0369a1' }, low: { bg: '#dcfce7', text: '#166534' } };
  const config = configs[priority];
  return <span style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, borderRadius: '4px', backgroundColor: config.bg, color: config.text, textTransform: 'uppercase' }}>{priority}</span>;
};

// Indexed metric cell
const IndexCell = ({ value, unit = '', inverse = false, thresholds = { red: -8, yellow: 0 } }) => {
  const status = getStatus(inverse ? -value : value, thresholds);
  const displayValue = value > 0 ? `+${value}` : value;
  return (
    <span style={{ fontSize: '13px', fontWeight: 600, color: statusColors[status] }}>
      {displayValue}{unit}
    </span>
  );
};

// Score bar
const ScoreBar = ({ score, label }) => {
  const getColor = (s) => s >= 7 ? colors.green : s >= 5.5 ? colors.yellow : colors.red;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy }}>{score.toFixed(1)}</span>
      </div>
      <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px' }}>
        <div style={{ height: '100%', width: `${score * 10}%`, backgroundColor: getColor(score), borderRadius: '3px' }}/>
      </div>
    </div>
  );
};

// Status dot
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
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusDot status={status} />
          <span style={{ fontSize: '12px', fontWeight: 500, color: colors.darkNavy }}>{label}</span>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, color: statusColors[status] }}>
          {numValue > 0 ? '+' : ''}{value}{unit}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', height: '8px' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {!isPositive && <div style={{ width: `${percentage}%`, height: '8px', backgroundColor: statusColors[status], borderRadius: '4px 0 0 4px' }}/>}
        </div>
        <div style={{ width: '2px', height: '12px', backgroundColor: '#9ca3af', margin: '0 1px' }}/>
        <div style={{ flex: 1 }}>
          {isPositive && <div style={{ width: `${percentage}%`, height: '8px', backgroundColor: statusColors[status], borderRadius: '0 4px 4px 0' }}/>}
        </div>
      </div>
    </div>
  );
};

// ============ PORTFOLIO VIEW ============
const PortfolioView = ({ onSelectCompany }) => {
  const totalUpside = portfolioData.reduce((s, c) => s + c.estimatedUpside, 0);
  const totalARR = portfolioData.reduce((s, c) => s + c.arr, 0);
  const avgHealth = portfolioData.reduce((s, c) => s + c.healthScore, 0) / portfolioData.length;
  const criticalCount = portfolioData.filter(c => c.priority === 'critical' || c.priority === 'high').length;

  const columns = {
    company: '1 0 140px',
    health: '0 0 65px',
    vsUniv: '0 0 60px',
    nrr: '0 0 55px',
    grr: '0 0 55px',
    win: '0 0 55px',
    cycle: '0 0 60px',
    ltvcac: '0 0 65px',
    opportunity: '1 0 160px',
    upside: '0 0 80px',
    action: '0 0 55px'
  };

  return (
    <div>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px' }}>Total Addressable Upside</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: colors.coral }}>{formatCurrency(totalUpside)}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>{((totalUpside / totalARR) * 100).toFixed(0)}% of portfolio ARR</div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px' }}>Portfolio Health</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MiniGauge score={avgHealth} size={58} />
            <div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>vs. universe</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: colors.green }}>+0.5 pts</div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px' }}>Need Attention</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: colors.red }}>{criticalCount}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Critical or high priority</div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px' }}>Avg. Improvement ROI</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: colors.green }}>8.2x</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Based on similar interventions*</div>
        </div>
      </div>

      {/* Portfolio Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>Portfolio Companies — Ranked by Opportunity</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Metrics indexed vs. universe median (0 = median)</div>
        </div>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 24px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', gap: '4px' }}>
          <div style={{ flex: columns.company, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Company</div>
          <div style={{ flex: columns.health, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>Health</div>
          <div style={{ flex: columns.vsUniv, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>vs Univ</div>
          
          <div style={{ width: '1px', height: '28px', backgroundColor: '#d1d5db', margin: '0 12px' }}></div>
          
          <div style={{ flex: columns.nrr, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>NRR</div>
          <div style={{ flex: columns.grr, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>GRR</div>
          <div style={{ flex: columns.win, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>Win%</div>
          <div style={{ flex: columns.cycle, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>S.Cycle</div>
          <div style={{ flex: columns.ltvcac, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' }}>LTV/CAC</div>
          
          <div style={{ width: '1px', height: '28px', backgroundColor: '#d1d5db', margin: '0 12px' }}></div>
          
          <div style={{ flex: columns.opportunity, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Top Opportunity</div>
          
          <div style={{ width: '1px', height: '28px', backgroundColor: '#d1d5db', margin: '0 12px' }}></div>
          
          <div style={{ flex: columns.upside, fontSize: '9px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', textAlign: 'right' }}>Upside</div>
          <div style={{ flex: columns.action }}></div>
        </div>
        
        {sortedCompanies.map((c) => {
          const healthIndex = (c.healthScore - c.peerHealthScore).toFixed(1);
          const nrrIndex = c.nrr - c.peerNrr;
          const grrIndex = c.grr - c.peerGrr;
          const winIndex = c.winRate - c.peerWinRate;
          const cycleIndex = c.salesCycle - c.peerSalesCycle;
          const ltvCacIndex = getLtvCacIndex(c);
          const topOpp = c.topOpportunities[0];
          
          return (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #f3f4f6', gap: '4px' }}>
              <div style={{ flex: columns.company }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>{formatCurrency(c.arr)}</div>
              </div>
              <div style={{ flex: columns.health, textAlign: 'center' }}><MiniGauge score={c.healthScore} size={44} /></div>
              <div style={{ flex: columns.vsUniv, textAlign: 'center' }}>
                <IndexCell value={parseFloat(healthIndex)} unit="" thresholds={{ red: -1.5, yellow: 0 }} />
              </div>
              
              <div style={{ width: '1px', height: '36px', backgroundColor: '#e5e7eb', margin: '0 12px' }}></div>
              
              <div style={{ flex: columns.nrr, textAlign: 'center' }}>
                <IndexCell value={nrrIndex} unit="" thresholds={{ red: -10, yellow: -3 }} />
              </div>
              <div style={{ flex: columns.grr, textAlign: 'center' }}>
                <IndexCell value={grrIndex} unit="" thresholds={{ red: -5, yellow: -1 }} />
              </div>
              <div style={{ flex: columns.win, textAlign: 'center' }}>
                <IndexCell value={winIndex} unit="" thresholds={{ red: -8, yellow: -2 }} />
              </div>
              <div style={{ flex: columns.cycle, textAlign: 'center' }}>
                <IndexCell value={cycleIndex} unit="d" inverse={true} thresholds={{ red: -20, yellow: -5 }} />
              </div>
              <div style={{ flex: columns.ltvcac, textAlign: 'center' }}>
                <IndexCell value={parseFloat(ltvCacIndex)} unit="x" thresholds={{ red: -1, yellow: -0.3 }} />
              </div>
              
              <div style={{ width: '1px', height: '36px', backgroundColor: '#e5e7eb', margin: '0 12px' }}></div>
              
              <div style={{ flex: columns.opportunity }}>
                {topOpp ? (
                  <span style={{ fontSize: '13px', fontWeight: 500, color: colors.darkNavy }}>{topOpp.dimension}</span>
                ) : (
                  <span style={{ fontSize: '12px', color: colors.green, fontWeight: 500 }}>✓ On track</span>
                )}
              </div>
              
              <div style={{ width: '1px', height: '36px', backgroundColor: '#e5e7eb', margin: '0 12px' }}></div>
              
              <div style={{ flex: columns.upside, textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: c.estimatedUpside > 1500000 ? colors.coral : colors.darkNavy }}>{formatCurrency(c.estimatedUpside)}</div>
              </div>
              <div style={{ flex: columns.action, textAlign: 'right' }}>
                <button onClick={() => onSelectCompany(c)} style={{ fontSize: '12px', color: colors.coral, fontWeight: 600, padding: '6px 10px', borderRadius: '4px', backgroundColor: 'rgba(238,108,77,0.1)', border: 'none', cursor: 'pointer' }}>View →</button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div style={{ marginTop: '16px', padding: '14px 24px', backgroundColor: '#fff', borderRadius: '8px', display: 'flex', gap: '28px', alignItems: 'center', fontSize: '11px', color: '#6b7280' }}>
        <span style={{ fontWeight: 600 }}>Index Key:</span>
        <span><span style={{ color: colors.green, fontWeight: 600 }}>Green</span> = above median</span>
        <span><span style={{ color: colors.yellow, fontWeight: 600 }}>Yellow</span> = near median</span>
        <span><span style={{ color: colors.red, fontWeight: 600 }}>Red</span> = below median</span>
        <span style={{ marginLeft: 'auto' }}>S.Cycle: negative = faster (better)</span>
      </div>
    </div>
  );
};

// ============ COMPANY DETAIL VIEW ============
const CompanyDetail = ({ company, onBack, onShowBoard }) => {
  const healthIndex = (company.healthScore - company.peerHealthScore).toFixed(1);
  
  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: '16px', padding: '10px 18px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: colors.darkNavy }}>← Back to Portfolio</button>
      
      {/* Company Header */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <MiniGauge score={company.healthScore} size={80} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <span style={{ fontSize: '26px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</span>
              <PriorityBadge priority={company.priority} />
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>{company.sector} • {company.stage} • {formatCurrency(company.arr)} ARR</div>
            <div style={{ fontSize: '13px', marginTop: '6px' }}>
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

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left: Our Analysis */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>Commercial Health Analysis</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '20px' }}>Based on public-facing materials assessment</div>
          
          <ScoreBar score={company.valueArticulation} label="Value Articulation" />
          <ScoreBar score={company.pricingArchitecture} label="Pricing Architecture" />
          <ScoreBar score={company.competitivePositioning} label="Competitive Positioning" />
          <ScoreBar score={company.salesEnablement} label="Sales Enablement" />
          <ScoreBar score={company.customerROI} label="Customer ROI Proof" />
          
          {/* Performance correlation */}
          <div style={{ marginTop: '24px', padding: '18px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: `3px solid ${colors.navy}` }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Performance vs. Universe</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>NRR</span>
                <IndexCell value={company.nrr - company.peerNrr} unit="%" thresholds={{ red: -10, yellow: -3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>GRR</span>
                <IndexCell value={company.grr - company.peerGrr} unit="%" thresholds={{ red: -5, yellow: -1 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Win Rate</span>
                <IndexCell value={company.winRate - company.peerWinRate} unit="%" thresholds={{ red: -8, yellow: -2 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Sales Cycle</span>
                <IndexCell value={company.salesCycle - company.peerSalesCycle} unit="d" inverse={true} thresholds={{ red: -20, yellow: -5 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>LTV/CAC</span>
                <IndexCell value={parseFloat(getLtvCacIndex(company))} unit="x" thresholds={{ red: -1, yellow: -0.3 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Opportunities */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>Prioritized Improvement Opportunities</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>Ranked by estimated impact</div>
          
          {company.topOpportunities.length > 0 ? company.topOpportunities.map((opp, idx) => (
            <div key={idx} style={{ padding: '18px', backgroundColor: idx === 0 ? '#fef3c7' : '#f9fafb', borderRadius: '8px', marginBottom: '14px', border: idx === 0 ? `1px solid ${colors.yellow}` : '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>#{idx + 1} Priority</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.darkNavy }}>{opp.dimension}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: colors.green }}>{formatCurrency(opp.arrImpact)}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>potential ARR</div>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '12px', lineHeight: 1.5 }}>{opp.description}</div>
              <div style={{ display: 'flex', gap: '20px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '5px' }}>
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
              <div style={{ fontSize: '12px', color: '#6b7280' }}>No critical gaps identified</div>
            </div>
          )}
          
          {/* Board Export Button */}
          <div style={{ marginTop: '24px', padding: '20px', backgroundColor: colors.navy, borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>Board-Ready Report</div>
            <button onClick={() => onShowBoard(company)} style={{ width: '100%', padding: '14px', backgroundColor: colors.coral, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>View Board Slide →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ BOARD SLIDE VIEW ============
const BoardSlide = ({ company, onBack }) => {
  const metrics = [
    { label: 'NRR', value: company.nrr - company.peerNrr, unit: '%' },
    { label: 'GRR', value: company.grr - company.peerGrr, unit: '%' },
    { label: 'Win Rate', value: company.winRate - company.peerWinRate, unit: '%' },
    { label: 'Sales Cycle', value: company.salesCycle - company.peerSalesCycle, unit: 'd', inverse: true },
    { label: 'LTV/CAC', value: getLtvCacIndex(company), unit: 'x' },
  ];

  const redCount = metrics.filter(m => getStatus(m.inverse ? -parseFloat(m.value) : parseFloat(m.value), { red: -8, yellow: 0 }) === 'red').length;
  const yellowCount = metrics.filter(m => getStatus(m.inverse ? -parseFloat(m.value) : parseFloat(m.value), { red: -8, yellow: 0 }) === 'yellow').length;
  const greenCount = metrics.filter(m => getStatus(m.inverse ? -parseFloat(m.value) : parseFloat(m.value), { red: -8, yellow: 0 }) === 'green').length;

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: '16px', padding: '10px 18px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: colors.darkNavy }}>← Back to Company</button>
      
      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '14px' }}>Board Slide Preview</div>
      
      {/* The Board Slide */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Commercial Health Assessment</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>{company.sector} • {formatCurrency(company.arr)} ARR</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: colors.red, display: 'inline-block' }}/>
                <span style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>{redCount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: colors.yellow, display: 'inline-block' }}/>
                <span style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>{yellowCount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: colors.green, display: 'inline-block' }}/>
                <span style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>{greenCount}</span>
              </div>
            </div>
            <div style={{ backgroundColor: colors.cream, padding: '14px 18px', borderRadius: '8px', borderLeft: `4px solid ${colors.coral}` }}>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>ADDRESSABLE UPSIDE</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: colors.coral }}>{formatCurrency(company.estimatedUpside)}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }}>
          {/* Left: Indexed Metrics */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>Performance vs. Universe</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '18px' }}>Index: 0 = median • Left = below • Right = above</div>
            
            {metrics.map((m, i) => (
              <IndexedBar key={i} label={m.label} value={m.value} unit={m.unit} inverse={m.inverse} />
            ))}
          </div>

          {/* Right: Priority Actions */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>Priority Actions</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '18px' }}>Ranked by estimated ARR impact</div>
            
            {company.topOpportunities.length > 0 ? company.topOpportunities.map((opp, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: idx === 0 ? '#fef3c7' : '#f9fafb', borderRadius: '6px', marginBottom: '10px', borderLeft: `4px solid ${idx === 0 ? colors.yellow : '#e5e7eb'}` }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>{opp.dimension}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{opp.impact}</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: colors.green }}>{formatCurrency(opp.arrImpact)}</div>
              </div>
            )) : (
              <div style={{ padding: '28px', backgroundColor: '#f9fafb', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '15px', color: colors.green, fontWeight: 600 }}>✓ No critical gaps</div>
              </div>
            )}
            
            <div style={{ marginTop: '18px', padding: '16px', backgroundColor: colors.navy, borderRadius: '8px', color: '#fff' }}>
              <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '4px' }}>TOTAL OPPORTUNITY</div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>{formatCurrency(company.topOpportunities.reduce((s, o) => s + o.arrImpact, 0))}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '28px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af' }}>
          <span>Remidi Works • Commercial Health Intelligence</span>
          <span>Q1 2026 • Apex Growth Partners II</span>
        </div>
      </div>
    </div>
  );
};

// ============ MAIN COMPONENT ============
export default function ContributorDemo() {
  const [view, setView] = useState('portfolio');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setView('company');
  };

  const handleShowBoard = (company) => {
    setSelectedCompany(company);
    setView('board');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: colors.navy, padding: '14px 24px', borderBottom: `3px solid ${colors.coral}` }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginRight: '8px' }}>
              <span style={{ fontSize: '16px' }}>←</span> All Demos
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ backgroundColor: colors.coral, width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '11px' }}>RW</span>
              <span style={{ fontSize: '19px', fontWeight: 700, color: '#fff' }}>Remidi Works</span>
              <span style={{ fontSize: '11px', color: colors.lightBlue, marginLeft: '8px' }}>Partner Data Cooperative</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '5px', padding: '3px' }}>
              <Link to="/investor" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '6px 14px', fontSize: '11px', fontWeight: 600, borderRadius: '4px', border: 'none', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Observer</button>
              </Link>
              <button style={{ padding: '6px 14px', fontSize: '11px', fontWeight: 600, borderRadius: '4px', border: 'none', backgroundColor: colors.coral, color: '#fff', cursor: 'pointer' }}>Contributor</button>
            </div>
            <span style={{ color: '#fff', fontSize: '13px' }}>Apex Growth Partners II</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }}>
        {view === 'portfolio' && <PortfolioView onSelectCompany={handleSelectCompany} />}
        {view === 'company' && selectedCompany && <CompanyDetail company={selectedCompany} onBack={() => setView('portfolio')} onShowBoard={handleShowBoard} />}
        {view === 'board' && selectedCompany && <BoardSlide company={selectedCompany} onBack={() => setView('company')} />}
      </main>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 24px', fontSize: '10px', color: '#9ca3af' }}>
        *Estimates based on proprietary models incorporating industry research and data from 100+ B2B technology companies.
      </div>
    </div>
  );
}
