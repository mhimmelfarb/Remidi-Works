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

// Peer fund benchmarks
const peerFunds = [
  { name: 'Meridian Capital Fund III', avgHealth: 6.85, portfolioSize: 14, rank: 1 },
  { name: 'Apex Growth Partners II', avgHealth: 6.31, portfolioSize: 10, rank: 2 },
  { name: 'Summit Partners VII', avgHealth: 6.15, portfolioSize: 12, rank: 3 },
  { name: 'Catalyst Ventures', avgHealth: 5.92, portfolioSize: 8, rank: 4 },
  { name: 'Horizon Growth Equity', avgHealth: 5.48, portfolioSize: 9, rank: 5 },
  { name: 'Evergreen Tech Fund', avgHealth: 5.21, portfolioSize: 11, rank: 6 },
];

// Default portfolio data (used if no client param or file not found)
const defaultPortfolio = {
  fundName: "Sample Growth Partners",
  fundType: "Growth Equity",
  lastUpdated: new Date().toISOString().split('T')[0],
  portfolio: [
    { id: 1, name: 'CloudSync Pro', sector: 'DevOps/Infrastructure', stage: 'Series B', healthScore: 7.8, relativeScore: 2.0, valueArticulation: 8.2, pricingArchitecture: 7.5, competitivePositioning: 7.9, salesEnablement: 6.8, customerROI: 8.5, status: 'outperformer', invested: 2022, topGaps: [], observation: 'Strong value story' },
    { id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A', healthScore: 5.4, relativeScore: -0.4, valueArticulation: 4.8, pricingArchitecture: 5.2, competitivePositioning: 6.1, salesEnablement: 4.5, customerROI: 6.4, status: 'underperformer', invested: 2023, topGaps: ['Value Articulation', 'Sales Enablement'], observation: 'No pricing page, unclear ICP' },
    { id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C', healthScore: 8.1, relativeScore: 2.3, valueArticulation: 8.5, pricingArchitecture: 8.0, competitivePositioning: 8.3, salesEnablement: 7.8, customerROI: 7.9, status: 'outperformer', invested: 2021, topGaps: [], observation: 'Clear differentiation' },
    { id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A', healthScore: 4.2, relativeScore: -1.6, valueArticulation: 3.5, pricingArchitecture: 4.8, competitivePositioning: 4.9, salesEnablement: 3.2, customerROI: 4.6, status: 'critical', invested: 2023, topGaps: ['Value Articulation', 'Sales Enablement', 'Customer ROI'], observation: 'Feature-focused, no proof' },
    { id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B', healthScore: 6.3, relativeScore: 0.5, valueArticulation: 6.8, pricingArchitecture: 5.5, competitivePositioning: 6.2, salesEnablement: 6.5, customerROI: 6.5, status: 'average', invested: 2022, topGaps: ['Pricing Architecture'], observation: 'Solid positioning' },
  ]
};

// Dynamic import for client data files
const loadClientData = async (clientId) => {
  try {
    const module = await import(`./data/${clientId}.json`);
    return module.default;
  } catch (e) {
    console.log(`No data file found for client: ${clientId}, using default`);
    return null;
  }
};

// Score gauge component
const ScoreGauge = ({ score, label, size = 'normal' }) => {
  const percentage = (score / 10) * 100;
  const getColor = (s) => s >= 7 ? colors.green : s >= 5 ? colors.yellow : colors.red;
  const isSmall = size === 'small';
  
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        position: 'relative', 
        width: isSmall ? 60 : 80, 
        height: isSmall ? 60 : 80, 
        margin: '0 auto' 
      }}>
        <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          fontSize: isSmall ? 14 : 18,
          fontWeight: 700,
          color: colors.darkNavy
        }}>
          {score.toFixed(1)}
        </div>
      </div>
      {label && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{label}</div>}
    </div>
  );
};

// Company row component
const CompanyRow = ({ company, onClick, isSelected }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'outperformer': return colors.green;
      case 'critical': return colors.red;
      case 'underperformer': return colors.yellow;
      default: return colors.lightBlue;
    }
  };
  
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 80px 100px 120px',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: isSelected ? colors.cream : '#fff',
        borderBottom: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
    >
      <div>
        <div style={{ fontWeight: 600, color: colors.darkNavy }}>{company.name}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{company.sector}</div>
      </div>
      <div style={{ fontSize: 13, color: '#6b7280' }}>{company.stage}</div>
      <ScoreGauge score={company.healthScore} size="small" />
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6,
        color: company.relativeScore >= 0 ? colors.green : colors.red,
        fontWeight: 600,
        fontSize: 13
      }}>
        {company.relativeScore >= 0 ? '▲' : '▼'} {Math.abs(company.relativeScore).toFixed(1)} vs avg
      </div>
      <div style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: `${getStatusColor(company.status)}15`,
        color: getStatusColor(company.status),
        textTransform: 'capitalize'
      }}>
        {company.status}
      </div>
    </div>
  );
};

// Peer benchmark bar
const PeerBar = ({ fund, maxHealth, isCurrentFund }) => {
  const percentage = (fund.avgHealth / maxHealth) * 100;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: isCurrentFund ? '8px 12px' : '6px 12px',
      backgroundColor: isCurrentFund ? `${colors.coral}10` : 'transparent',
      borderRadius: '6px',
      marginBottom: '4px'
    }}>
      <div style={{ 
        width: 140, 
        fontSize: 12, 
        color: isCurrentFund ? colors.darkNavy : '#6b7280',
        fontWeight: isCurrentFund ? 600 : 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {isCurrentFund ? '→ ' : ''}{fund.name}
      </div>
      <div style={{ flex: 1, height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          width: `${percentage}%`,
          backgroundColor: isCurrentFund ? colors.coral : colors.lightBlue,
          borderRadius: 4
        }} />
      </div>
      <div style={{ width: 32, fontSize: 12, fontWeight: 600, color: colors.darkNavy, textAlign: 'right' }}>
        {fund.avgHealth.toFixed(1)}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function InvestorDemo() {
  const [searchParams] = useSearchParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [fundInfo, setFundInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [tier, setTier] = useState('investor');
  const [sortBy, setSortBy] = useState('relativeScore');
  const [sortDir, setSortDir] = useState('desc');

  // Load client data based on URL parameter
  useEffect(() => {
    const loadData = async () => {
      const clientId = searchParams.get('client');
      
      if (clientId) {
        const clientData = await loadClientData(clientId);
        if (clientData) {
          setFundInfo({ name: clientData.fundName, type: clientData.fundType, lastUpdated: clientData.lastUpdated });
          setPortfolioData(clientData.portfolio);
        } else {
          setFundInfo({ name: defaultPortfolio.fundName, type: defaultPortfolio.fundType, lastUpdated: defaultPortfolio.lastUpdated });
          setPortfolioData(defaultPortfolio.portfolio);
        }
      } else {
        setFundInfo({ name: defaultPortfolio.fundName, type: defaultPortfolio.fundType, lastUpdated: defaultPortfolio.lastUpdated });
        setPortfolioData(defaultPortfolio.portfolio);
      }
      setLoading(false);
    };
    
    loadData();
  }, [searchParams]);

  if (loading || !portfolioData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: colors.navy, marginBottom: 8 }}>Loading Portfolio...</div>
          <div style={{ color: '#6b7280' }}>Analyzing commercialization health</div>
        </div>
      </div>
    );
  }

  // Calculate portfolio aggregates
  const avgHealth = portfolioData.reduce((sum, c) => sum + c.healthScore, 0) / portfolioData.length;
  const avgRelative = portfolioData.reduce((sum, c) => sum + c.relativeScore, 0) / portfolioData.length;
  const underperformers = portfolioData.filter(c => c.status === 'underperformer' || c.status === 'critical');
  const outperformers = portfolioData.filter(c => c.status === 'outperformer');
  
  // Sort companies
  const sortedCompanies = [...portfolioData].sort((a, b) => {
    const multiplier = sortDir === 'desc' ? -1 : 1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  // Find dimension with most gaps across portfolio
  const gapCounts = {};
  portfolioData.forEach(c => {
    (c.topGaps || []).forEach(gap => {
      gapCounts[gap] = (gapCounts[gap] || 0) + 1;
    });
  });
  const topGap = Object.entries(gapCounts).sort((a, b) => b[1] - a[1])[0];

  // Get max health for peer bar scaling
  const maxPeerHealth = Math.max(...peerFunds.map(f => f.avgHealth), avgHealth);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: colors.navy, 
        padding: '16px 24px',
        borderBottom: `3px solid ${colors.coral}`
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>← All Demos</Link>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ 
                  backgroundColor: colors.coral, 
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontWeight: 700, color: '#fff', fontSize: 13, letterSpacing: '-0.5px'
                }}>RW</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Remidi Works</span>
              </div>
              <span style={{ fontSize: 11, color: colors.lightBlue, marginLeft: 40 }}>Building Revenue Model Excellence</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* Tier Toggle */}
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: 3 }}>
              <button
                onClick={() => setTier('investor')}
                style={{
                  padding: '6px 12px', fontSize: 12, fontWeight: 600, borderRadius: 4, border: 'none', cursor: 'pointer',
                  backgroundColor: tier === 'investor' ? colors.coral : 'transparent',
                  color: tier === 'investor' ? '#fff' : 'rgba(255,255,255,0.7)'
                }}
              >Investor</button>
              <button
                onClick={() => setTier('operator')}
                style={{
                  padding: '6px 12px', fontSize: 12, fontWeight: 600, borderRadius: 4, border: 'none', cursor: 'pointer',
                  backgroundColor: tier === 'operator' ? colors.coral : 'transparent',
                  color: tier === 'operator' ? '#fff' : 'rgba(255,255,255,0.7)'
                }}
              >Operator</button>
            </div>
            
            <div style={{ color: '#fff', fontSize: 14 }}>
              <span style={{ opacity: 0.7 }}>Viewing:</span>{' '}
              <span style={{ fontWeight: 600 }}>{fundInfo.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
        
        {/* Portfolio Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Portfolio Health</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ScoreGauge score={avgHealth} />
              <div>
                <div style={{ fontSize: 13, color: avgRelative >= 0 ? colors.green : colors.red, fontWeight: 600 }}>
                  {avgRelative >= 0 ? '+' : ''}{avgRelative.toFixed(1)} vs universe
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>Universe avg: {UNIVERSE_AVG}</div>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Companies Analyzed</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: colors.darkNavy }}>{portfolioData.length}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              <span style={{ color: colors.green }}>{outperformers.length} outperforming</span>
              {' • '}
              <span style={{ color: colors.red }}>{underperformers.length} need attention</span>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Common Pattern</div>
            {topGap ? (
              <>
                <div style={{ fontSize: 18, fontWeight: 600, color: colors.coral }}>{topGap[0]}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{topGap[1]} of {portfolioData.length} companies</div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: colors.green }}>No common gaps detected</div>
            )}
          </div>
          
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Priority Company</div>
            {underperformers.length > 0 ? (
              <>
                <div style={{ fontSize: 18, fontWeight: 600, color: colors.darkNavy }}>
                  {underperformers.sort((a,b) => a.healthScore - b.healthScore)[0].name}
                </div>
                <div style={{ fontSize: 12, color: colors.red }}>
                  Score: {underperformers.sort((a,b) => a.healthScore - b.healthScore)[0].healthScore.toFixed(1)} • Highest opportunity
                </div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: colors.green }}>All companies performing well</div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {['overview', 'companies', 'benchmarks'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? '#fff' : 'transparent',
                color: activeTab === tab ? colors.navy : '#6b7280',
                boxShadow: activeTab === tab ? '0 -1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0 12px 12px 12px', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
              {/* Company List */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.darkNavy }}>Portfolio Companies</h3>
                  <select 
                    value={`${sortBy}-${sortDir}`}
                    onChange={(e) => {
                      const [field, dir] = e.target.value.split('-');
                      setSortBy(field);
                      setSortDir(dir);
                    }}
                    style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 13 }}
                  >
                    <option value="relativeScore-desc">Highest Relative Score</option>
                    <option value="relativeScore-asc">Lowest Relative Score</option>
                    <option value="healthScore-desc">Highest Health Score</option>
                    <option value="healthScore-asc">Lowest Health Score</option>
                  </select>
                </div>
                
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1.5fr 80px 100px 120px',
                    padding: '10px 16px',
                    backgroundColor: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#6b7280'
                  }}>
                    <div>Company</div>
                    <div>Stage</div>
                    <div>Score</div>
                    <div>vs Avg</div>
                    <div>Status</div>
                  </div>
                  {sortedCompanies.map(company => (
                    <CompanyRow 
                      key={company.id} 
                      company={company} 
                      onClick={() => setSelectedCompany(company)}
                      isSelected={selectedCompany?.id === company.id}
                    />
                  ))}
                </div>
              </div>
              
              {/* Company Detail Panel */}
              <div>
                {selectedCompany ? (
                  <div style={{ backgroundColor: '#f9fafb', borderRadius: 12, padding: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.darkNavy, marginBottom: 4 }}>
                      {selectedCompany.name}
                    </h3>
                    <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
                      {selectedCompany.sector} • {selectedCompany.stage}
                    </div>
                    
                    <div style={{ marginBottom: 20 }}>
                      <ScoreGauge score={selectedCompany.healthScore} label="Overall Health" />
                    </div>
                    
                    <div style={{ fontSize: 13, marginBottom: 16 }}>
                      <div style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: 8 }}>Dimension Scores</div>
                      {[
                        { key: 'valueArticulation', label: 'Value Articulation' },
                        { key: 'pricingArchitecture', label: 'Pricing Architecture' },
                        { key: 'competitivePositioning', label: 'Competitive Positioning' },
                        { key: 'salesEnablement', label: 'Sales Enablement' },
                        { key: 'customerROI', label: 'Customer ROI' }
                      ].map(dim => (
                        <div key={dim.key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 140, fontSize: 12, color: '#6b7280' }}>{dim.label}</div>
                          <div style={{ flex: 1, height: 6, backgroundColor: '#e5e7eb', borderRadius: 3 }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${(selectedCompany[dim.key] / 10) * 100}%`,
                              backgroundColor: selectedCompany[dim.key] >= 7 ? colors.green : selectedCompany[dim.key] >= 5 ? colors.yellow : colors.red,
                              borderRadius: 3
                            }} />
                          </div>
                          <div style={{ width: 28, fontSize: 12, fontWeight: 600 }}>{selectedCompany[dim.key].toFixed(1)}</div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedCompany.observation && (
                      <div style={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: 8, 
                        padding: 12,
                        fontSize: 13
                      }}>
                        <div style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: 4 }}>Observation</div>
                        <div style={{ color: '#6b7280' }}>{selectedCompany.observation}</div>
                      </div>
                    )}
                    
                    <button style={{
                      width: '100%',
                      marginTop: 16,
                      padding: '12px',
                      backgroundColor: colors.coral,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Request Deep Dive →
                    </button>
                  </div>
                ) : (
                  <div style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: 12, 
                    padding: 40, 
                    textAlign: 'center',
                    color: '#6b7280'
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                    <div>Click a company to see details</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'companies' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {sortedCompanies.map(company => (
                <div 
                  key={company.id}
                  style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: 12, 
                    padding: 20,
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: colors.darkNavy }}>{company.name}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{company.sector}</div>
                    </div>
                    <ScoreGauge score={company.healthScore} size="small" />
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>{company.observation}</div>
                  {company.topGaps?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {company.topGaps.map(gap => (
                        <span key={gap} style={{ 
                          fontSize: 10, 
                          padding: '2px 8px', 
                          backgroundColor: `${colors.coral}15`,
                          color: colors.coral,
                          borderRadius: 10
                        }}>{gap}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'benchmarks' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.darkNavy, marginBottom: 16 }}>
                  {tier === 'operator' ? 'Peer Fund Comparison' : 'Universe Comparison'}
                </h3>
                
                {tier === 'operator' ? (
                  <div>
                    <PeerBar 
                      fund={{ name: fundInfo.name, avgHealth: avgHealth, portfolioSize: portfolioData.length, rank: 0 }} 
                      maxHealth={maxPeerHealth} 
                      isCurrentFund={true} 
                    />
                    {peerFunds.map(fund => (
                      <PeerBar key={fund.name} fund={fund} maxHealth={maxPeerHealth} isCurrentFund={false} />
                    ))}
                    <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8, fontSize: 13 }}>
                      <span style={{ fontWeight: 600, color: colors.green }}>Operator Benefit:</span>{' '}
                      <span style={{ color: '#6b7280' }}>Real peer data from 6 participating funds</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ 
                      padding: 20, 
                      backgroundColor: '#f9fafb', 
                      borderRadius: 12, 
                      textAlign: 'center',
                      border: '2px dashed #e5e7eb'
                    }}>
                      <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>
                        Upgrade to Operator tier to see peer fund benchmarks
                      </div>
                      <button 
                        onClick={() => setTier('operator')}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: colors.coral,
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Unlock Peer Benchmarks
                      </button>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Your Portfolio vs Universe Average</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: colors.darkNavy }}>{avgHealth.toFixed(1)}</div>
                        <div style={{ fontSize: 13, color: avgRelative >= 0 ? colors.green : colors.red }}>
                          {avgRelative >= 0 ? '+' : ''}{avgRelative.toFixed(1)} vs {UNIVERSE_AVG} universe avg
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.darkNavy, marginBottom: 16 }}>
                  Score Distribution
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 150 }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(bucket => {
                    const count = portfolioData.filter(c => Math.floor(c.healthScore) === bucket).length;
                    const height = count > 0 ? (count / portfolioData.length) * 100 + 20 : 8;
                    return (
                      <div 
                        key={bucket} 
                        style={{ 
                          flex: 1, 
                          height: `${height}%`,
                          backgroundColor: bucket >= 7 ? colors.green : bucket >= 5 ? colors.yellow : colors.red,
                          borderRadius: '4px 4px 0 0',
                          opacity: count > 0 ? 1 : 0.3
                        }}
                        title={`${bucket}-${bucket + 1}: ${count} companies`}
                      />
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b7280', marginTop: 4 }}>
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div style={{ 
          marginTop: 32, 
          padding: '16px 0', 
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>
            Remidi Works Revenue Model Health framework • Last updated: {fundInfo.lastUpdated}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>Demo for concept testing</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: colors.navy }}>RemidiWorks.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
