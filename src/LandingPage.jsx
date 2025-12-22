import React from 'react';
import { Link } from 'react-router-dom';

const colors = {
  navy: '#3D5A80',
  coral: '#EE6C4D',
  lightBlue: '#98C1D9',
  darkNavy: '#293241',
  cream: '#E0FBFC',
};

export default function LandingPage() {
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
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ 
              backgroundColor: colors.coral, 
              padding: '6px 10px', 
              borderRadius: 6,
              fontWeight: 700, color: '#fff', fontSize: 13, letterSpacing: '-0.5px'
            }}>RW</span>
            <div>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Remidi Works</span>
              <span style={{ fontSize: 11, color: colors.lightBlue, marginLeft: 12 }}>Building Revenue Model Excellence</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            RemidiWorks.com
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ 
            display: 'inline-block',
            padding: '6px 14px', 
            backgroundColor: `${colors.coral}15`, 
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            color: colors.coral,
            marginBottom: 16
          }}>
            For Middle Market PE Firms & Portfolio Companies
          </div>
          <h1 style={{ 
            fontSize: 36, 
            fontWeight: 700, 
            color: colors.darkNavy, 
            marginBottom: 20,
            lineHeight: 1.2
          }}>
            Decision Support Platform for Revenue Model Excellence
          </h1>
          <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 700, margin: '0 auto 24px', lineHeight: 1.6 }}>
            Continuous benchmarking and diagnostics that identify pricing underperformers, 
            calculate dollar upside, and prioritize fixes across your portfolio.
          </p>
          
          {/* Value Prop - What, So What, Now What */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 2, 
            maxWidth: 700, 
            margin: '0 auto',
            backgroundColor: '#e5e7eb',
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            <div style={{ backgroundColor: '#fff', padding: '20px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.navy, marginBottom: 6 }}>WHAT</div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>See where you rank vs. peers</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.navy, marginBottom: 6 }}>SO WHAT</div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>Know what's broken</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.navy, marginBottom: 6 }}>NOW WHAT</div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>Fix what matters</div>
            </div>
          </div>
        </div>

        {/* Demo Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          
          {/* User Demo Card */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: 16, 
            padding: 32,
            boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              width: 48, height: 48, 
              backgroundColor: `${colors.lightBlue}30`, 
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20
            }}>
              <span style={{ fontSize: 24 }}>👤</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.darkNavy, marginBottom: 12 }}>
              Portfolio Company View
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
              See how a CMO or CRO at a portfolio company uses Remidi Works to diagnose 
              commercialization gaps and build a prioritized action plan.
            </p>
            <ul style={{ fontSize: 13, color: '#6b7280', marginBottom: 24, paddingLeft: 20 }}>
              <li style={{ marginBottom: 6 }}>Diagnostic from observable data</li>
              <li style={{ marginBottom: 6 }}>Interactive score refinement</li>
              <li style={{ marginBottom: 6 }}>Prioritized workstreams</li>
              <li>Capability-building, not consultant dependency</li>
            </ul>
            <Link 
              to="/user"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: colors.navy,
                color: '#fff',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14
              }}
            >
              Launch Demo →
            </Link>
          </div>

          {/* Investor Demo Card */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: 16, 
            padding: 32,
            boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              width: 48, height: 48, 
              backgroundColor: `${colors.coral}20`, 
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20
            }}>
              <span style={{ fontSize: 24 }}>📊</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.darkNavy, marginBottom: 12 }}>
              Investor Portfolio View
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
              Portfolio-level intelligence for PE investors. Cross-portfolio scoring, 
              peer fund benchmarking, and pattern recognition.
            </p>
            <ul style={{ fontSize: 13, color: '#6b7280', marginBottom: 24, paddingLeft: 20 }}>
              <li style={{ marginBottom: 6 }}>Identify underperformers at a glance</li>
              <li style={{ marginBottom: 6 }}>Compare against peer fund benchmarks</li>
              <li style={{ marginBottom: 6 }}>Calculate dollar upside potential</li>
              <li>Continuous intelligence, not audits</li>
            </ul>
            <Link 
              to="/investor"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: colors.coral,
                color: '#fff',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14
              }}
            >
              Launch Demo →
            </Link>
          </div>
        </div>

        {/* Peer Benchmarking Model */}
        <div style={{ 
          marginTop: 48, 
          padding: 24, 
          backgroundColor: colors.darkNavy, 
          borderRadius: 12,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.coral, marginBottom: 8 }}>THE MODEL</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              Peer Benchmarking at Scale
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              PE firms contribute portfolio metrics and gain access to comparative intelligence 
              across the network. Better data for everyone. No consultant dependency.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.coral }}>100+</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Companies Benchmarked</div>
            </div>
            <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.coral }}>5</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Scoring Dimensions</div>
            </div>
            <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.coral }}>20-30%</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Typical Revenue Left Behind</div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div style={{ 
          marginTop: 32, 
          padding: 16, 
          backgroundColor: `${colors.lightBlue}15`, 
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
            <strong style={{ color: colors.darkNavy }}>Demo:</strong> Interactive concept demos for testing. 
            Representative data, not actual companies.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid #e5e7eb', 
        padding: '24px',
        marginTop: 48
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
            © 2025 HG Partners. Remidi Works is a product of HG Partners.
          </p>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
            RemidiWorks.com
          </p>
        </div>
      </footer>
    </div>
  );
}
