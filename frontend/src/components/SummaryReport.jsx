import React from "react";
import "./SummaryReport.css";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const SummaryReport = ({ summary }) => {
  if (!summary) return null;
  if (summary.error) return <div className="error">{summary.error}</div>;

  // Format table for copy
  const tableText = summary.table_summary
    ? [
        Object.keys(summary.table_summary[0]).join(", "),
        ...summary.table_summary.map(row =>
          Object.values(row).join(", ")
        ),
      ].join("\n")
    : "";

  // Format top rows for copy
  const topRowsText = summary.top_rows
    ? [
        Object.keys(summary.top_rows[0]).join(", "),
        ...summary.top_rows.map(row =>
          Object.values(row).join(", ")
        ),
      ].join("\n")
    : "";

  return (
    <div className="summary-container">
      <div className="summary-section">
        <h2>Text Summary</h2>
        <button className="copy-btn" onClick={() => copyToClipboard(summary.text_summary)}>
          Copy
        </button>
        <pre className="summary-text">{summary.text_summary}</pre>
      </div>
      <div className="summary-section">
        <h2>Table Summary</h2>
        <button className="copy-btn" onClick={() => copyToClipboard(tableText)}>
          Copy
        </button>
        <div className="table-scroll">
          <table className="summary-table">
            <thead>
              <tr>
                {Object.keys(summary.table_summary[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summary.table_summary.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{typeof val === "object" ? JSON.stringify(val) : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="summary-section">
        <h2>Top 5 Rows Preview</h2>
        <button className="copy-btn" onClick={() => copyToClipboard(topRowsText)}>
          Copy
        </button>
        <div className="table-scroll">
          <table className="summary-table">
            <thead>
              <tr>
                {Object.keys(summary.top_rows[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summary.top_rows.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;