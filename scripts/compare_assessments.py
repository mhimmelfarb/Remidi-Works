#!/usr/bin/env python3
"""
Compare two assessments for the same company to track progress.

Usage:
    python compare_assessments.py <company_slug> <date1> <date2>

Example:
    python compare_assessments.py peaktech 2026-01-30 2026-04-30
"""

import json
import sys
from pathlib import Path
from datetime import datetime

def load_assessment(company_slug, date):
    """Load assessment scores from JSON file."""
    base_path = Path(f"../companies/{company_slug}/assessments")

    # Find assessment folder matching date
    assessment_folders = list(base_path.glob(f"{date}*"))

    if not assessment_folders:
        print(f"❌ No assessment found for {company_slug} on {date}")
        return None

    scores_file = assessment_folders[0] / "assessment_scores.json"

    if not scores_file.exists():
        print(f"❌ Scores file not found: {scores_file}")
        return None

    with open(scores_file, 'r') as f:
        return json.load(f)

def calculate_score_delta(old_score, new_score):
    """Calculate score change and format with color."""
    delta = new_score - old_score

    if delta > 0:
        return f"+{delta}", "🟢"
    elif delta < 0:
        return f"{delta}", "🔴"
    else:
        return "0", "⚪"

def generate_comparison_report(company_slug, date1, date2):
    """Generate markdown comparison report."""

    assessment1 = load_assessment(company_slug, date1)
    assessment2 = load_assessment(company_slug, date2)

    if not assessment1 or not assessment2:
        print("❌ Could not load both assessments")
        return None

    company_name = assessment1['assessment_metadata']['company']

    # Overall score comparison
    score1 = assessment1['overall_score']['value']
    score2 = assessment2['overall_score']['value']
    delta, icon = calculate_score_delta(score1, score2)

    report = f"""# {company_name} - Assessment Comparison

**Baseline:** {date1} → **Current:** {date2}

## Overall Score Change

| Metric | {date1} | {date2} | Change |
|--------|---------|---------|--------|
| Commercial Maturity Score | {score1}/100 | {score2}/100 | **{delta}** {icon} |

---

## Dimension Score Changes

"""

    # Dimension comparisons
    dimensions = [
        ('value_articulation', 'Value Articulation'),
        ('pricing_architecture', 'Pricing Architecture'),
        ('competitive_positioning', 'Competitive Positioning'),
        ('sales_enablement', 'Sales Enablement'),
        ('customer_roi_proof', 'Customer ROI Proof')
    ]

    for dim_key, dim_name in dimensions:
        old_dim = assessment1['dimension_scores'][dim_key]
        new_dim = assessment2['dimension_scores'][dim_key]

        old_score = old_dim['score']
        new_score = new_dim['score']
        delta, icon = calculate_score_delta(old_score, new_score)

        old_tier = old_dim['tier']
        new_tier = new_dim['tier']

        report += f"### {dim_name}\n\n"
        report += f"| Metric | {date1} | {date2} | Change |\n"
        report += f"|--------|---------|---------|--------|\n"
        report += f"| Score | {old_score}/100 | {new_score}/100 | **{delta}** {icon} |\n"
        report += f"| Tier | {old_tier} | {new_tier} | {'🎉' if new_tier != old_tier else '➡️'} |\n\n"

        # Improvement notes
        if new_score > old_score:
            report += f"**Progress:** Score improved by {new_score - old_score} points.\n\n"
        elif new_score < old_score:
            report += f"**Regression:** Score decreased by {old_score - new_score} points. Requires attention.\n\n"
        else:
            report += f"**Status:** No change in score.\n\n"

    report += "---\n\n"

    # Critical gap comparison
    old_gap = assessment1.get('critical_gap', {})
    new_gap = assessment2.get('critical_gap', {})

    if old_gap and new_gap:
        report += "## Critical Gap Status\n\n"
        report += f"**Previous:** {old_gap.get('title', 'N/A')}\n\n"
        report += f"**Current:** {new_gap.get('title', 'N/A')}\n\n"

        if old_gap.get('title') != new_gap.get('title'):
            report += "✅ **Critical gap has changed** - indicates progress on previous top priority.\n\n"
        else:
            report += "⚠️ **Same critical gap persists** - requires focused intervention.\n\n"

    report += "---\n\n"

    # Recommendations
    report += "## Key Observations\n\n"

    total_delta = score2 - score1

    if total_delta >= 10:
        report += f"🎉 **Excellent Progress**: Overall score improved by {total_delta} points. Commercial health significantly strengthened.\n\n"
    elif total_delta >= 5:
        report += f"✅ **Good Progress**: Overall score improved by {total_delta} points. Momentum in the right direction.\n\n"
    elif total_delta > 0:
        report += f"📈 **Modest Progress**: Overall score improved by {total_delta} points. Continue current initiatives.\n\n"
    elif total_delta == 0:
        report += f"➡️ **Flat**: No overall score change. May need to adjust strategy or increase execution velocity.\n\n"
    else:
        report += f"🔴 **Regression**: Overall score decreased by {abs(total_delta)} points. Requires immediate attention.\n\n"

    report += "---\n\n"
    report += f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n"

    return report

def main():
    if len(sys.argv) != 4:
        print("Usage: python compare_assessments.py <company_slug> <date1> <date2>")
        print("Example: python compare_assessments.py peaktech 2026-01-30 2026-04-30")
        sys.exit(1)

    company_slug = sys.argv[1]
    date1 = sys.argv[2]
    date2 = sys.argv[3]

    print(f"📊 Comparing assessments for {company_slug}...")
    print(f"   Baseline: {date1}")
    print(f"   Current: {date2}")
    print()

    report = generate_comparison_report(company_slug, date1, date2)

    if report:
        # Save report
        output_path = Path(f"../companies/{company_slug}/assessments/{date2}_progress_check")
        output_path.mkdir(parents=True, exist_ok=True)

        report_file = output_path / "comparison_report.md"

        with open(report_file, 'w') as f:
            f.write(report)

        print(f"✅ Comparison report generated:")
        print(f"   {report_file}")
        print()
        print("=" * 80)
        print(report)
        print("=" * 80)
    else:
        print("❌ Failed to generate comparison report")
        sys.exit(1)

if __name__ == "__main__":
    main()
