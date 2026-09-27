import { useEffect, useState } from "react";
import {
  analyzeResume,
  getResumeCheck,
  type ResumeCheck as ResumeCheckData,
} from "../../api/resume-check";

const scoreItems = [
  { key: "overall_score", label: "Overall", icon: "★" },
  { key: "ats_score", label: "ATS Compatibility", icon: "✓" },
  { key: "content_score", label: "Content Quality", icon: "✦" },
  { key: "impact_score", label: "Impact", icon: "↗" },
  { key: "readability_score", label: "Readability", icon: "Aa" },
  { key: "job_alignment_score", label: "Job Alignment", icon: "◎" },
] as const;

export default function ResumeCheck() {
  const [data, setData] = useState<ResumeCheckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      setData(await getResumeCheck());
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      // A 404 simply means this resume has not been analyzed yet.
      if (message.toLowerCase().includes("not found")) {
        setData(null);
        setError("");
      } else {
        setError(message || "Unable to load your resume check.");
      }
    } finally {
      setLoading(false);
    }
  };

  const run = async () => {
    try {
      setAnalyzing(true);
      setError("");
      setData(await analyzeResume());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Resume analysis failed. Please try again."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <main className="user-page resume-check-page">
        <section className="resume-check-loading page-card">
          <div className="resume-check-logo">✓</div>
          <h2>Loading Resume Check</h2>
          <p>Preparing your resume analysis...</p>
        </section>
      </main>
    );
  }

  const getScore = (key: (typeof scoreItems)[number]["key"]) =>
    Math.round(Number(data?.[key] ?? 0));

  return (
    <main className="user-page resume-check-page">
      <section className="resume-check-hero">
        <div className="resume-check-hero-content">
          <div className="resume-check-title-row">
            <div className="resume-check-title-icon" aria-hidden="true">
              📝
            </div>
            <div>
              <div className="resume-check-eyebrow">RESUME OPTIMIZER</div>
              <h1>Resume Check</h1>
            </div>
          </div>
          <p>
            Review your resume for ATS readability, content strength, measurable
            impact, and alignment with your target roles.
          </p>
        </div>

        <button
          type="button"
          className="resume-check-primary-button"
          onClick={run}
          disabled={analyzing}
        >
          <span aria-hidden="true">{analyzing ? "◌" : "✓"}</span>
          {analyzing
            ? "Analyzing Resume..."
            : data
              ? "Re-check Resume"
              : "Check My Resume"}
        </button>
      </section>

      {error && (
        <div className="resume-check-alert" role="alert">
          <span aria-hidden="true">!</span>
          <div>
            <strong>We couldn't load your analysis</strong>
            <p>{error}</p>
          </div>
          <button type="button" onClick={load}>
            Try again
          </button>
        </div>
      )}

      {!data ? (
        <section className="resume-check-empty page-card">
          <div className="resume-check-empty-icon" aria-hidden="true">
            📄
          </div>
          <div className="resume-check-empty-copy">
            <span className="resume-check-card-label">FIRST STEP</span>
            <h2>Get your resume ready</h2>
            <p>
              Upload a readable resume from <strong>My Resume</strong>, then
              come back here to run a full check.
            </p>
            <div className="resume-check-feature-list">
              <span>✓ ATS readability</span>
              <span>✓ Content quality</span>
              <span>✓ Stronger impact</span>
              <span>✓ Target-role alignment</span>
            </div>
          </div>
          <a className="resume-check-secondary-button" href="/resume">
            Go to My Resume
            <span aria-hidden="true">→</span>
          </a>
        </section>
      ) : (
        <>
          <section className="resume-check-section-heading">
            <div>
              <span className="resume-check-card-label">YOUR SCORECARD</span>
              <h2>How your resume is performing</h2>
            </div>
            <span className="resume-check-updated">
              Updated {new Date(data.updated_at).toLocaleDateString()}
            </span>
          </section>

          <section className="resume-score-grid">
            {scoreItems.map((item) => {
              const score = getScore(item.key);
              return (
                <article
                  className={
                    item.key === "overall_score"
                      ? "resume-score-card resume-score-card-overall"
                      : "resume-score-card"
                  }
                  key={item.key}
                >
                  <div className="resume-score-card-top">
                    <span className="resume-score-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="resume-score-label">{item.label}</span>
                  </div>
                  <div className="resume-score-value">
                    <strong>{score}</strong>
                    <span>/100</span>
                  </div>
                  <div className="resume-score-bar" aria-label={`${score} out of 100`}>
                    <i style={{ width: `${score}%` }} />
                  </div>
                </article>
              );
            })}
          </section>

          <section className="page-card resume-copy-fixes-panel">
            <div className="resume-check-panel-heading">
              <div>
                <span className="resume-check-card-label">COPY & REPLACE</span>
                <h2>Make these changes directly</h2>
              </div>
              <span className="resume-check-count">
                {data.analysis.quick_fixes?.length ?? 0} {data.analysis.quick_fixes?.length === 1 ? "edit" : "edits"}
              </span>
            </div>
            <p className="resume-copy-fixes-intro">
              JobPilot gives you replacement-ready text based on your target role and the facts already detected in your resume. Review each change before using it.
            </p>
            <div className="resume-copy-fix-list">
              {(data.analysis.quick_fixes ?? []).map((fix, index) => (
                <article className="resume-copy-fix" key={index}>
                  <div className="resume-copy-fix-header">
                    <div>
                      <span className="severity severity-medium">{fix.category}</span>
                      <h3>{fix.type === "BULLET_REWRITE" ? "Replace this bullet" : fix.type === "SUMMARY_TEMPLATE" ? "Add or replace your summary" : "Review this skill gap"}</h3>
                    </div>
                    <button
                      type="button"
                      className="resume-copy-button"
                      onClick={() => navigator.clipboard?.writeText(fix.replacement)}
                    >
                      Copy replacement
                    </button>
                  </div>
                  {fix.original && (
                    <div className="resume-copy-box resume-copy-before">
                      <span>Current</span>
                      <p>{fix.original}</p>
                    </div>
                  )}
                  <div className="resume-copy-box resume-copy-after">
                    <span>Replacement</span>
                    <p>{fix.replacement}</p>
                  </div>
                  <p className="resume-copy-note">{fix.note}</p>
                </article>
              ))}
              {!data.analysis.quick_fixes?.length && (
                <div className="resume-no-issues">
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>Your resume does not need obvious copy-level fixes.</strong>
                    <p>Keep your content truthful and tailor it to each target role.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="resume-check-main-grid">
            <article className="page-card resume-check-panel">
              <div className="resume-check-panel-heading">
                <div>
                  <span className="resume-check-card-label">ACTION PLAN</span>
                  <h2>What to improve</h2>
                </div>
                <span className="resume-check-count">
                  {data.analysis.issues.length}{" "}
                  {data.analysis.issues.length === 1 ? "item" : "items"}
                </span>
              </div>

              {data.analysis.issues.length ? (
                <div className="resume-issue-list">
                  {data.analysis.issues.map((issue, index) => (
                    <div className="resume-issue" key={index}>
                      <div className="resume-issue-marker" aria-hidden="true">
                        {issue.severity === "HIGH"
                          ? "!"
                          : issue.severity === "MEDIUM"
                            ? "•"
                            : "i"}
                      </div>
                      <div className="resume-issue-body">
                        <div className="resume-issue-meta">
                          <span
                            className={`severity severity-${issue.severity.toLowerCase()}`}
                          >
                            {issue.severity}
                          </span>
                          <span>{issue.category}</span>
                        </div>
                        <h3>{issue.title}</h3>
                        <p>{issue.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="resume-no-issues">
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>No major issues detected</strong>
                    <p>Your resume passed the main checks in this analysis.</p>
                  </div>
                </div>
              )}
            </article>

            <article className="page-card resume-check-panel">
              <div className="resume-check-panel-heading">
                <div>
                  <span className="resume-check-card-label">RESUME SNAPSHOT</span>
                  <h2>Quick overview</h2>
                </div>
              </div>

              <div className="resume-stats">
                <div>
                  <strong>{data.analysis.stats.word_count}</strong>
                  <span>Words</span>
                </div>
                <div>
                  <strong>{data.analysis.stats.bullet_count}</strong>
                  <span>Content lines</span>
                </div>
                <div>
                  <strong>{data.analysis.stats.quantified_items}</strong>
                  <span>Numbers detected</span>
                </div>
              </div>

              <div className="resume-check-subsection">
                <h3>Sections found</h3>
                <div className="resume-tags">
                  {data.analysis.stats.sections.map((section) => (
                    <span key={section}>{section}</span>
                  ))}
                </div>
              </div>

              {data.analysis.strengths.length > 0 && (
                <div className="resume-check-subsection">
                  <h3>What's working</h3>
                  <div className="resume-strength-list">
                    {data.analysis.strengths.map((strength) => (
                      <p className="resume-strength" key={strength}>
                        <span aria-hidden="true">✓</span>
                        {strength}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </section>
        </>
      )}
    </main>
  );
}
