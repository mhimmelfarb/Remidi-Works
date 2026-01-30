# Company Intelligence Repository

This folder contains **all research, assessments, and client materials** for each company we've assessed. Every company gets its own folder organized by assessment date.

## Why This Exists

1. **Don't Re-Research**: When clients upgrade from rapid scan ($0) to full diagnostic ($6K), we have all the baseline research saved
2. **Track Progress**: Compare assessments 3/6 months apart to measure commercial health improvements
3. **Single Source of Truth**: All company data (our research + client-provided docs) in one place
4. **Client Deliverables**: Zip up the folder and send as part of full diagnostic package

## Folder Structure

```
companies/
  {company-slug}/
    metadata.json                    # Company info, contact, assessment history
    assessments/
      {date}_rapid_scan/
        index.html                   # Public-facing assessment (deployed to web)
        assessment_scores.json       # Structured scoring data (queryable)
        research_data.json           # All web search results, sources, findings
        research_notes.md            # Human-readable analysis
      {date}_progress_check/
        index.html
        assessment_scores.json
        research_data.json
        comparison_report.md         # Shows score changes vs. baseline
    client_materials/
      kickoff_call_notes.md
      internal_metrics.xlsx
      competitive_intelligence.pdf
```

## File Descriptions

### `metadata.json`
Company overview, contact info, assessment history. Quick reference for "what do we know about this company?"

**Example:**
```json
{
  "company_name": "Peak Technologies",
  "website": "https://www.peaktech.com",
  "industry": "Supply Chain Technology",
  "revenue": "$121.9M",
  "assessment_history": [
    {
      "date": "2026-01-30",
      "type": "rapid_scan",
      "overall_score": 53,
      "status": "completed"
    }
  ]
}
```

### `assessment_scores.json`
Structured scoring data in queryable format. Use this for comparisons, charts, analysis.

**Contains:**
- Overall score + benchmark
- All 5 dimension scores with confidence levels
- Critical gap
- Key findings
- Recommendations
- Upgrade potential assessment

### `research_data.json`
Raw research artifacts. All web search results, Glassdoor reviews, customer feedback, competitive intel, pricing data, etc. saved as structured JSON.

**Use cases:**
- Reference original sources without re-searching
- Share research with client in full diagnostic
- Build on existing research for deeper analysis

### `research_notes.md`
Human-readable analysis. Markdown format for easy reading/sharing.

**Contains:**
- Executive summary
- Detailed findings by topic
- Scoring rationale
- Data gaps
- Tactical recommendations
- Sources

### `comparison_report.md`
Automatically generated report showing score changes between two assessment dates.

**Generated with:**
```bash
cd scripts/
python compare_assessments.py peaktech 2026-01-30 2026-04-30
```

## Usage Examples

### 1. Client Upgrades to Full Diagnostic

**Scenario:** Peak Technologies pays $6K for full diagnostic.

**Process:**
1. Review existing research in `assessments/2026-01-30_rapid_scan/`
2. Create `client_materials/` folder
3. Add client-provided docs (internal metrics, competitor intel, etc.)
4. Schedule stakeholder interviews
5. Build on existing research (don't redo web searches)
6. Deliver comprehensive report with all materials zipped

### 2. Track Progress After 3 Months

**Scenario:** Peak implements recommendations, wants progress check.

**Process:**
1. Run new rapid scan on 2026-04-30
2. Compare: `python compare_assessments.py peaktech 2026-01-30 2026-04-30`
3. Review `comparison_report.md` showing score changes
4. Identify: what improved, what regressed, what's flat
5. Adjust recommendations based on progress

### 3. Quick Reference Before Call

**Scenario:** Client call scheduled, need quick refresh.

**Process:**
1. Open `metadata.json` for basics
2. Open `research_notes.md` for detailed findings
3. Review `assessment_scores.json` for specific scores
4. Check `client_materials/` for previous conversation notes

## Automation Scripts

### Compare Assessments

**Location:** `/scripts/compare_assessments.py`

**Usage:**
```bash
cd scripts/
python compare_assessments.py peaktech 2026-01-30 2026-04-30
```

**Output:**
- Generates `comparison_report.md` in second assessment folder
- Shows overall score delta
- Shows dimension-by-dimension changes
- Identifies if critical gap changed
- Provides progress interpretation

### Future Scripts (Planned)

**`save_research_data.py`**
- Automatically saves all research artifacts during rapid scan
- Creates folder structure
- Populates JSON files
- Updates metadata.json

**`run_rapid_scan_full.py`**
- Prompts for company name/URL
- Runs research
- Saves all data to `/companies/{slug}/`
- Generates HTML
- Commits to git
- Ready for deployment

## File Sizes

**Typical company folder:**
- HTML assessment: ~47KB
- research_data.json: ~50-100KB
- assessment_scores.json: ~15-25KB
- research_notes.md: ~20-30KB
- **Total per assessment: ~150-200KB**

**Storage projection:**
- 100 companies = ~20MB
- 500 companies = ~100MB
- Negligible disk usage

## Git Workflow

Each company folder is committed independently:

```bash
git add companies/peaktech/
git commit -m "Add Peak Technologies rapid scan (score: 53/100)"
git push
```

Benefits:
- Version controlled
- Backed up to GitHub
- Audit trail of all research
- Easy to share with team

## Best Practices

### 1. Always Create Metadata First
When starting a new company, create `metadata.json` with basic info before doing research.

### 2. Use Consistent Date Format
Always use `YYYY-MM-DD` format for assessment folders (e.g., `2026-01-30_rapid_scan`)

### 3. Update Assessment History
After each assessment, update `metadata.json` with new entry in `assessment_history` array.

### 4. Save Client Materials Separately
Keep client-provided docs in `client_materials/` to distinguish from our research.

### 5. Add README for Custom Folders
If adding custom analysis or special projects, include a README explaining what it is.

## Current Companies

- **peaktech** - Peak Technologies (Supply Chain Tech, $122M, PE-backed)
  - 2026-01-30: Rapid Scan (Score: 53/100)

---

*Last updated: 2026-01-30*
