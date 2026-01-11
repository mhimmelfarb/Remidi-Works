import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

// Cooperative stats
const cooperativeStats = {
  totalCompanies: 198,
  totalFunds: 24,
  sectors: 12
};

// Sector benchmarks from cooperative
const sectorBenchmarks = {
  'DevOps/Infrastructure': { median: 6.2, topQuartile: 7.5, n: 23 },
  'AI/ML Platform': { median: 5.8, topQuartile: 7.1, n: 31 },
  'Cybersecurity': { median: 6.8, topQuartile: 8.0, n: 28 },
  'Logistics Tech': { median: 5.4, topQuartile: 6.8, n: 18 },
  'HR Tech': { median: 6.0, topQuartile: 7.2, n: 22 },
  'FinTech': { median: 6.5, topQuartile: 7.8, n: 35 },
  'HealthTech': { median: 5.6, topQuartile: 7.0, n: 19 },
  'Retail Analytics': { median: 6.1, topQuartile: 7.4, n: 14 },
  'Supply Chain': { median: 5.7, topQuartile: 7.0, n: 16 },
  'MarTech': { median: 6.3, topQuartile: 7.6, n: 27 }
};

// Dimension definitions
const dimensions = [
  { key: 'va', name: 'Value Articulation', short: 'Val. Art.' },
  { key: 'pa', name: 'Pricing Architecture', short: 'Pricing' },
  { key: 'cp', name: 'Competitive Position', short: 'Comp. Pos.' },
  { key: 'se', name: 'Sales Enablement', short: 'Sales En.' },
  { key: 'cr', name: 'Customer ROI Proof', short: 'ROI Proof' },
];

// Portfolio data aligned with InvestorDemo
const portfolioCompanies = [
  { 
    id: 1, name: 'CloudSync Pro', sector: 'DevOps/Infrastructure', stage: 'Series B',
    arr: 18.5, since: '2022', 
    scores: { va: 8.2, pa: 7.5, cp: 7.9, se: 6.8, cr: 8.5 }, 
    overall: 7.8, trend: 'up', status: 'outperformer',
    estimatedUpside: 925000
  },
  { 
    id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A',
    arr: 8.2, since: '2023', 
    scores: { va: 4.8, pa: 5.2, cp: 6.1, se: 4.5, cr: 6.4 }, 
    overall: 5.4, trend: 'flat', status: 'underperformer',
    estimatedUpside: 1850000,
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.5, issue: 'No ROI calculator or quantified proof points' },
      { dimension: 'Value Articulation', score: 4.8, issue: 'Features described but outcomes not quantified' }
    ]
  },
  { 
    id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C',
    arr: 32.0, since: '2021', 
    scores: { va: 8.5, pa: 8.0, cp: 8.3, se: 7.8, cr: 7.9 }, 
    overall: 8.1, trend: 'up', status: 'outperformer',
    estimatedUpside: 640000
  },
  { 
    id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A',
    arr: 6.8, since: '2023', 
    scores: { va: 3.5, pa: 4.8, cp: 4.9, se: 3.2, cr: 4.6 }, 
    overall: 4.2, trend: 'down', status: 'underperformer',
    estimatedUpside: 2380000,
    topGaps: [
      { dimension: 'Sales Enablement', score: 3.2, issue: 'No published pricing, no case studies with ROI' },
      { dimension: 'Value Articulation', score: 3.5, issue: 'No connection to customer P&L impact' },
      { dimension: 'Customer ROI Proof', score: 4.6, issue: 'Claims savings but no calculator or evidence' }
    ]
  },
  { 
    id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B',
    arr: 12.4, since: '2022', 
    scores: { va: 6.8, pa: 5.5, cp: 6.2, se: 6.5, cr: 6.5 }, 
    overall: 6.3, trend: 'up', status: 'on-track',
    estimatedUpside: 1116000
  },
  { 
    id: 6, name: 'PayStream', sector: 'FinTech', stage: 'Series B',
    arr: 21.0, since: '2021', 
    scores: { va: 7.5, pa: 7.8, cp: 6.8, se: 7.0, cr: 6.9 }, 
    overall: 7.2, trend: 'up', status: 'outperformer',
    estimatedUpside: 840000
  },
  { 
    id: 7, name: 'HealthBridge', sector: 'HealthTech', stage: 'Series A',
    arr: 5.2, since: '2024', 
    scores: { va: 5.5, pa: 4.2, cp: 5.8, se: 4.8, cr: 5.2 }, 
    overall: 5.1, trend: 'flat', status: 'underperformer',
    estimatedUpside: 1196000,
    topGaps: [
      { dimension: 'Pricing Architecture', score: 4.2, issue: 'Single flat-rate tier regardless of size' },
      { dimension: 'Sales Enablement', score: 4.8, issue: 'Limited competitive positioning materials' }
    ]
  },
  { 
    id: 8, name: 'RetailIQ', sector: 'Retail Analytics', stage: 'Series B',
    arr: 15.6, since: '2022', 
    scores: { va: 7.2, pa: 6.5, cp: 6.9, se: 6.2, cr: 7.2 }, 
    overall: 6.8, trend: 'up', status: 'on-track',
    estimatedUpside: 780000
  },
  { 
    id: 9, name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B',
    arr: 11.8, since: '2021', 
    scores: { va: 5.2, pa: 6.8, cp: 5.5, se: 4.8, cr: 5.2 }, 
    overall: 5.5, trend: 'down', status: 'underperformer',
    estimatedUpside: 1534000,
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.8, issue: 'No battle cards or competitive differentiation' },
      { dimension: 'Value Articulation', score: 5.2, issue: 'Generic efficiency claims without proof' }
    ]
  },
  { 
    id: 10, name: 'MarketPulse', sector: 'MarTech', stage: 'Series A',
    arr: 7.4, since: '2023', 
    scores: { va: 6.9, pa: 6.2, cp: 6.8, se: 5.8, cr: 6.8 }, 
    overall: 6.5, trend: 'up', status: 'on-track',
    estimatedUpside: 592000
  }
];

// Helper functions
const getScoreColor = (score) => {
  if (score >= 7.0) return colors.green;
  if (score >= 5.5) return colors.yellow;
  return colors.red;
};

const getScoreBg = (score) => {
  if (score >= 7.0) return 'rgba(45, 147, 108, 0.1)';
  if (score >= 5.5) return 'rgba(244, 163, 0, 0.1)';
  return 'rgba(193, 41, 46, 0.1)';
};

const formatCurrency = (num) => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  return `$${(num / 1000).toFixed(0)}K`;
};

// Components
const ScoreBadge = ({ score, size = 'md' }) => {
  const sizeStyles = {
    lg: { fontSize: '24px', padding: '8px 16px' },
    md: { fontSize: '14px', padding: '4px 12px' },
    sm: { fontSize: '12px', padding: '2px 8px' }
  };
  return (
    <span style={{ 
      fontWeight: 600,
      borderRadius: '20px',
      color: getScoreColor(score), 
      backgroundColor: getScoreBg(score),
      border: `1px solid ${getScoreColor(score)}20`,
      ...sizeStyles[size]
    }}>
      {score.toFixed(1)}
    </span>
  );
};

const DistributionBar = ({ value, median, topQuartile }) => {
  const position = Math.min(Math.max((value / 10) * 100, 10), 95);
  const medianPos = (median / 10) * 100;
  const topQuartilePos = (topQuartile / 10) * 100;
  
  return (
    <div style={{ position: 'relative', height: '32px', borderRadius: '8px', overflow: 'hidden', background: 'linear-gradient(to right, #fecaca, #fef3c7, #d1fae5)' }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', backgroundColor: '#9ca3af', left: `${medianPos}%` }}>
        <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#6b7280' }}>50th</span>
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', backgroundColor: '#9ca3af', left: `${topQuartilePos}%` }}>
        <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#6b7280' }}>75th</span>
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: `${position}%`,
        transform: 'translate(-50%, -50%)',
        width: '16px', 
        height: '16px', 
        borderRadius: '50%',
        backgroundColor: colors.navy,
        border: '2px solid white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  );
};

const MiniSparkline = ({ trend }) => {
  const paths = {
    up: 'M0,20 L10,18 L20,12 L30,14 L40,8 L50,5',
    down: 'M0,5 L10,8 L20,12 L30,10 L40,16 L50,20',
    flat: 'M0,12 L10,11 L20,13 L30,12 L40,11 L50,12'
  };
  const color = trend === 'up' ? colors.green : trend === 'down' ? colors.red : '#6b7280';
  return (
    <svg width="50" height="24" style={{ display: 'inline-block', marginLeft: '8px' }}>
      <path d={paths[trend]} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

// Portfolio Overview Component
const PortfolioOverview = ({ companies, onSelectCompany }) => {
  const portfolioAvg = companies.reduce((a, c) => a + c.overall, 0) / companies.length;
  const totalARR = companies.reduce((a, c) => a + c.arr, 0);
  const totalUpside = companies.reduce((a, c) => a + c.estimatedUpside, 0);
  const atRiskCount = companies.filter(c => c.status === 'underperformer').length;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Portfolio Companies</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.navy }}>{companies.length}</div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Combined ARR</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.navy }}>${totalARR.toFixed(1)}M</div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Portfolio Health</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: getScoreColor(portfolioAvg) }}>{portfolioAvg.toFixed(1)}</span>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>58th %ile</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#fef2f2', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #fecaca' }}>
          <div style={{ fontSize: '14px', color: colors.red, marginBottom: '4px' }}>Total Upside Identified</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.red }}>{formatCurrency(totalUpside)}</div>
          <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{atRiskCount} companies need attention</div>
        </div>
      </div>

      {/* Portfolio Distribution */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Your Portfolio vs. Cooperative (n={cooperativeStats.totalCompanies} companies)</h3>
        <div style={{ marginBottom: '32px', marginTop: '32px' }}>
          <DistributionBar value={portfolioAvg} median={5.8} topQuartile={7.2} />
          <div style={{ position: 'relative', marginTop: '8px' }}>
            <span style={{ position: 'absolute', left: `${(portfolioAvg / 10) * 100}%`, transform: 'translateX(-50%)', fontSize: '13px', fontWeight: 600, color: colors.navy }}>
              Your portfolio: {portfolioAvg.toFixed(1)}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginTop: '40px' }}>
          <span>2.0 - Critical</span>
          <span>5.8 - Median</span>
          <span>7.2 - Top Quartile</span>
          <span>10.0 - Excellent</span>
        </div>
      </div>

      {/* Company Heatmap */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontWeight: 600, color: colors.darkNavy }}>Portfolio Health Heatmap</h3>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Click any company for detailed analysis</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ARR</th>
                {dimensions.map(d => (
                  <th key={d.key} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.short}</th>
                ))}
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr 
                  key={company.id}
                  onClick={() => onSelectCompany(company)}
                  style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 500, color: colors.darkNavy }}>{company.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{company.sector}</div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#4b5563' }}>${company.arr}M</td>
                  {dimensions.map(d => (
                    <td key={d.key} style={{ padding: '16px', textAlign: 'center' }}>
                      <ScoreBadge score={company.scores[d.key]} size="sm" />
                    </td>
                  ))}
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <ScoreBadge score={company.overall} />
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <MiniSparkline trend={company.trend} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Priority Actions */}
      <div style={{ background: 'linear-gradient(to right, #fef3c7, #ffedd5)', borderRadius: '12px', padding: '24px', border: '1px solid #fcd34d' }}>
        <h3 style={{ fontWeight: 600, color: '#92400e', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚠️</span> Priority Attention Areas
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {companies.filter(c => c.status === 'underperformer').slice(0, 3).map(company => (
            <div key={company.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#78350f' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: company.overall < 5 ? colors.red : colors.yellow }}></span>
              <strong>{company.name}</strong> — Overall score {company.overall.toFixed(1)}. 
              {company.topGaps?.[0] && ` ${company.topGaps[0].dimension} critically low (${company.topGaps[0].score.toFixed(1)}).`}
              <span style={{ marginLeft: 'auto', fontWeight: 600, color: colors.coral }}>Est. upside: {formatCurrency(company.estimatedUpside)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Company Deep Dive Component
const CompanyDeepDive = ({ company, onBack }) => {
  const benchmark = sectorBenchmarks[company.sector] || { median: 5.8, topQuartile: 7.2, n: 20 };
  const percentile = Math.round((company.overall / 10) * 100);
  
  const dimensionDetails = dimensions.map(d => {
    const score = company.scores[d.key];
    const sectorMedian = benchmark.median + (Math.random() * 0.8 - 0.4); // Simulated per-dimension
    const pct = Math.round((score / 10) * 100);
    const gap = company.topGaps?.find(g => g.dimension.toLowerCase().includes(d.name.toLowerCase().split(' ')[0]));
    return {
      ...d,
      score,
      sectorMedian: sectorMedian.toFixed(1),
      percentile: pct,
      gap
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <button 
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <span>←</span> Back to Portfolio
      </button>

      {/* Company Header */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
              <span>{company.sector}</span>
              <span>•</span>
              <span>{company.stage}</span>
              <span>•</span>
              <span>${company.arr}M ARR</span>
              <span>•</span>
              <span>Portfolio since {company.since}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Overall Score</div>
            <ScoreBadge score={company.overall} size="lg" />
          </div>
        </div>
      </div>

      {/* Position in Sector */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Position in {company.sector}</h3>
        <div style={{ marginBottom: '24px', marginTop: '24px' }}>
          <DistributionBar value={company.overall} median={benchmark.median} topQuartile={benchmark.topQuartile} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', marginTop: '32px' }}>
          <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: colors.navy }}>{percentile}th</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Percentile</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: colors.yellow }}>+{Math.max(0, (benchmark.median - company.overall)).toFixed(1)}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>To reach 50th %ile</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: colors.green }}>+{Math.max(0, (benchmark.topQuartile - company.overall)).toFixed(1)}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>To reach 75th %ile</div>
          </div>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontWeight: 600, color: colors.darkNavy }}>Dimension Analysis</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Dimension</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Score</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Sector Median</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Percentile</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Gap Analysis</th>
            </tr>
          </thead>
          <tbody>
            {dimensionDetails.map(d => (
              <tr key={d.key} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500, color: colors.darkNavy }}>{d.name}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}><ScoreBadge score={d.score} /></td>
                <td style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>{d.sectorMedian}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: d.percentile < 30 ? colors.red : d.percentile < 50 ? colors.yellow : colors.green }}>
                    {d.percentile}th
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6b7280' }}>
                  {d.gap ? d.gap.issue : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {company.estimatedUpside > 0 && (
          <div style={{ backgroundColor: '#fef2f2', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: '#991b1b' }}>Total Estimated Upside Potential</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: colors.red }}>{formatCurrency(company.estimatedUpside)}</span>
          </div>
        )}
      </div>

      {/* Pattern Intelligence */}
      <div style={{ background: 'linear-gradient(to right, #d1fae5, #a7f3d0)', borderRadius: '12px', padding: '24px', border: '1px solid #6ee7b7' }}>
        <h3 style={{ fontWeight: 600, color: '#065f46', marginBottom: '12px' }}>Pattern Intelligence</h3>
        <p style={{ fontSize: '14px', color: '#047857' }}>
          Of the <strong>{benchmark.n} companies</strong> in the cooperative with similar profiles to {company.name}, 
          those that improved their lowest dimension by 2+ points saw <strong>average ARR growth acceleration of 15-22%</strong> over 12 months.
          {company.topGaps?.[0] && ` Focus area: ${company.topGaps[0].dimension}.`}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{ padding: '12px 24px', backgroundColor: colors.navy, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          Export Board Report
        </button>
        <button style={{ padding: '12px 24px', backgroundColor: 'white', color: colors.darkNavy, border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
          Generate Improvement Plan
        </button>
        <button style={{ padding: '12px 24px', backgroundColor: 'white', color: colors.darkNavy, border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
          Schedule Deep Dive
        </button>
      </div>
    </div>
  );
};

// Sector Intelligence Component
const SectorIntelligence = ({ companies }) => {
  const [selectedSector, setSelectedSector] = useState('AI/ML Platform');
  const sectors = [...new Set(companies.map(c => c.sector))];
  const sectorCompanies = companies.filter(c => c.sector === selectedSector);
  const benchmark = sectorBenchmarks[selectedSector] || { median: 5.8, topQuartile: 7.2, n: 20 };
  
  const sectorAvgs = {};
  dimensions.forEach(d => {
    sectorAvgs[d.key] = sectorCompanies.length > 0 
      ? sectorCompanies.reduce((a, c) => a + c.scores[d.key], 0) / sectorCompanies.length
      : 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Sector Selector */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedSector === sector ? colors.navy : '#f3f4f6',
                color: selectedSector === sector ? 'white' : '#4b5563',
                transition: 'all 0.15s'
              }}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Sector Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Companies in Cooperative</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.navy }}>{benchmark.n}</div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Your companies: {sectorCompanies.length}</div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Sector Median Score</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: getScoreColor(benchmark.median) }}>{benchmark.median.toFixed(1)}</div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Top Quartile Threshold</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.green }}>{benchmark.topQuartile.toFixed(1)}</div>
        </div>
      </div>

      {/* Dimension Comparison */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Your {selectedSector} Companies vs. Sector</h3>
        {sectorCompanies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
            No companies in this sector. Add portfolio companies to see benchmarks.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dimensions.map(d => {
              const yourAvg = sectorAvgs[d.key];
              const sectorMedian = benchmark.median + (Math.random() * 0.6 - 0.3);
              const gap = yourAvg - sectorMedian;
              return (
                <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '160px', fontSize: '14px', color: '#4b5563' }}>{d.name}</div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '80px', textAlign: 'right' }}>
                      <ScoreBadge score={yourAvg} size="sm" />
                    </div>
                    <div style={{ flex: 1, height: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        height: '100%', 
                        width: `${(yourAvg / 10) * 100}%`,
                        backgroundColor: getScoreColor(yourAvg),
                        borderRadius: '6px',
                        transition: 'width 0.3s'
                      }} />
                      <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        bottom: 0, 
                        width: '2px', 
                        backgroundColor: '#6b7280',
                        left: `${(sectorMedian / 10) * 100}%`
                      }} />
                    </div>
                    <div style={{ width: '64px', fontSize: '14px', fontWeight: 500, color: gap >= 0 ? colors.green : colors.red }}>
                      {gap >= 0 ? '+' : ''}{gap.toFixed(1)} pts
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#9ca3af' }}>
          Gray line = sector median. Comparison based on {benchmark.n} companies in cooperative.
        </div>
      </div>

      {/* Sector Insight */}
      <div style={{ background: 'linear-gradient(to right, #dbeafe, #e0f2fe)', borderRadius: '12px', padding: '24px', border: '1px solid #93c5fd' }}>
        <h3 style={{ fontWeight: 600, color: '#1e40af', marginBottom: '12px' }}>Sector Intelligence: {selectedSector}</h3>
        <div style={{ fontSize: '14px', color: '#1e3a8a' }}>
          <p style={{ marginBottom: '12px' }}>
            <strong>Key differentiator:</strong> In {selectedSector}, <strong>Pricing Architecture</strong> shows the widest variance between top and bottom performers. Companies that improve this dimension see average margin expansion of 12-18%.
          </p>
          {sectorCompanies.length > 0 && (
            <p>
              <strong>Pattern detected:</strong> Your portfolio's average ({(sectorCompanies.reduce((a, c) => a + c.overall, 0) / sectorCompanies.length).toFixed(1)}) is {sectorCompanies.reduce((a, c) => a + c.overall, 0) / sectorCompanies.length < benchmark.median ? 'below' : 'above'} sector median. {sectorCompanies.reduce((a, c) => a + c.overall, 0) / sectorCompanies.length < benchmark.median ? 'This represents significant improvement opportunity.' : 'This is a competitive strength.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Diligence Mode Component
const DiligenceMode = () => {
  const [showResults, setShowResults] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {!showResults ? (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Target Company Assessment</h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Enter a target company for pre-acquisition commercial health analysis</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Company Name</label>
              <input type="text" defaultValue="TargetCo Industries" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Website URL</label>
              <input type="text" defaultValue="www.targetco.com" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Sector</label>
              <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}>
                {Object.keys(sectorBenchmarks).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Estimated ARR</label>
              <input type="text" defaultValue="$12M" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
            </div>
          </div>
          <button 
            onClick={() => setShowResults(true)}
            style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: colors.coral, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
          >
            Run Diligence Assessment
          </button>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Diligence Assessment</div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.darkNavy }}>TargetCo Industries</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
                  <span>DevOps/Infrastructure</span>
                  <span>•</span>
                  <span>~$12M ARR</span>
                  <span>•</span>
                  <span style={{ color: colors.yellow, fontWeight: 500 }}>Pre-Acquisition</span>
                </div>
              </div>
              <button onClick={() => setShowResults(false)} style={{ fontSize: '14px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
                ← New Assessment
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: colors.cream, borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Estimated Score</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: colors.navy }}>5.2</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>38th percentile</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', color: '#92400e', marginBottom: '4px' }}>Confidence Level</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: colors.yellow }}>Medium</div>
                <div style={{ fontSize: '12px', color: '#92400e', marginTop: '4px' }}>Public data + CIM</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#d1fae5', borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', color: '#065f46', marginBottom: '4px' }}>Improvement Potential</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: colors.green }}>HIGH</div>
                <div style={{ fontSize: '12px', color: '#065f46', marginTop: '4px' }}>Strong base, weak execution</div>
              </div>
            </div>
          </div>

          {/* Perception Gap */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: '8px' }}>Perception Gap Analysis</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Management Self-Assessment vs. External Observable Data</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '8px 0', textAlign: 'left', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Dimension</th>
                  <th style={{ padding: '8px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Mgmt View</th>
                  <th style={{ padding: '8px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>External</th>
                  <th style={{ padding: '8px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase' }}>Gap</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Value Articulation', mgmt: 7.5, ext: 5.2, gap: -2.3 },
                  { name: 'Pricing Architecture', mgmt: 6.0, ext: 4.8, gap: -1.2 },
                  { name: 'Competitive Position', mgmt: 7.0, ext: 6.3, gap: -0.7 },
                  { name: 'Sales Enablement', mgmt: 5.5, ext: 4.2, gap: -1.3 },
                  { name: 'Customer ROI Proof', mgmt: 5.0, ext: 5.5, gap: 0.5 },
                ].map(d => (
                  <tr key={d.name} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 0', fontWeight: 500, color: colors.darkNavy }}>{d.name}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>{d.mgmt.toFixed(1)}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}><ScoreBadge score={d.ext} size="sm" /></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ fontWeight: 500, color: Math.abs(d.gap) > 1.5 ? colors.red : Math.abs(d.gap) > 0.5 ? colors.yellow : '#6b7280' }}>
                        {d.gap > 0 ? '+' : ''}{d.gap.toFixed(1)}
                        {Math.abs(d.gap) > 1.5 && ' ⚠️'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: colors.red }}>⚠️</span>
                <div style={{ fontSize: '14px', color: '#991b1b' }}>
                  <strong>Large perception gap detected</strong> on Value Articulation (-2.3). 
                  This indicates either lack of awareness (fixable) or lack of candor (red flag). 
                  Recommend deep-dive validation in diligence.
                </div>
              </div>
            </div>
          </div>

          {/* Value Creation Opportunity */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Value Creation Opportunity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Conservative</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#4b5563' }}>$1.4M</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>incremental EBITDA / 3yr</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: colors.cream, borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: colors.navy, marginBottom: '4px' }}>Realistic</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: colors.navy }}>$2.2M</div>
                <div style={{ fontSize: '11px', color: colors.navy }}>incremental EBITDA / 3yr</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#d1fae5', borderRadius: '12px' }}>
                <div style={{ fontSize: '14px', color: colors.green, marginBottom: '4px' }}>Optimistic</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: colors.green }}>$3.6M</div>
                <div style={{ fontSize: '11px', color: '#059669' }}>incremental EBITDA / 3yr</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#4b5563' }}>
              <div><strong>Based on:</strong> Peer improvement trajectories (n=23 similar companies)</div>
              <div style={{ marginTop: '4px' }}><strong>Primary lever:</strong> Value Articulation improvement (+$800K)</div>
              <div style={{ marginTop: '4px' }}><strong>Secondary lever:</strong> Sales Enablement (+$520K)</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '12px 24px', backgroundColor: colors.navy, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              Export IC Memo
            </button>
            <button style={{ padding: '12px 24px', backgroundColor: 'white', color: colors.darkNavy, border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Generate Full Diligence Report
            </button>
            <button style={{ padding: '12px 24px', backgroundColor: 'white', color: colors.darkNavy, border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Add to Pipeline
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Main Dashboard Component
export default function PEDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const tabs = [
    { id: 'portfolio', label: 'Portfolio Overview', icon: '📊' },
    { id: 'sectors', label: 'Sector Intelligence', icon: '🏭' },
    { id: 'diligence', label: 'Diligence Mode', icon: '🔍' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: colors.navy, color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: colors.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px' }}>
                RW
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>Remidi Works</div>
                <div style={{ fontSize: '11px', opacity: 0.75 }}>Commercial Excellence Platform</div>
              </div>
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', opacity: 0.75 }}>Cooperative Status</div>
              <div style={{ fontWeight: 600 }}>{cooperativeStats.totalCompanies} Companies • {cooperativeStats.totalFunds} Funds</div>
            </div>
            <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', opacity: 0.75 }}>Apex Growth Partners II</div>
              <div style={{ fontWeight: 600 }}>{portfolioCompanies.length} Portfolio Companies</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '4px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedCompany(null); }}
              style={{
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab.id ? colors.coral : 'transparent'}`,
                backgroundColor: 'transparent',
                color: activeTab === tab.id ? colors.navy : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {activeTab === 'portfolio' && !selectedCompany && (
          <PortfolioOverview 
            companies={portfolioCompanies} 
            onSelectCompany={setSelectedCompany} 
          />
        )}
        {activeTab === 'portfolio' && selectedCompany && (
          <CompanyDeepDive 
            company={selectedCompany} 
            onBack={() => setSelectedCompany(null)} 
          />
        )}
        {activeTab === 'sectors' && (
          <SectorIntelligence companies={portfolioCompanies} />
        )}
        {activeTab === 'diligence' && (
          <DiligenceMode />
        )}
      </main>

      {/* Footer CTA */}
      <div style={{ borderTop: '1px solid #e5e7eb', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <strong style={{ color: '#374151' }}>Unlock deeper insights:</strong> Add more portfolio companies to access sector-specific benchmarks and trajectory analysis.
          </div>
          <button style={{ padding: '10px 20px', backgroundColor: colors.coral, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Add Portfolio Companies
          </button>
        </div>
      </div>
    </div>
  );
}
