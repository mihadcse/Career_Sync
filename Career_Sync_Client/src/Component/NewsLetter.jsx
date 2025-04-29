import React from "react";

const NewsLetter = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem" /* space-y-5 equivalent */,
      }}
    >
      {/* Email for jobs section */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.75rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 204, 204, 0.3), 0 2px 4px -1px rgba(0, 204, 204, 0.2)",
        }}
      >
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            textAlign: "center",
            color: "#22d3ee",
          }}
        >
          Email me for jobs
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            lineHeight: "1.25",
            marginBottom: "0.75rem",
          }}
        >
          Looking for your next career opportunity? Send me your details and
          I'll match you with relevant job openings in your field.
        </p>
        <a
          href="mailto:zawadtasin@gmail.com"
          style={{
            color: "#22d3ee",
            textDecoration: "none",
            fontWeight: "600",
            display: "block",
            textAlign: "center",
          }}
        >
          zawadtasin@gmail.com
        </a>
      </div>

      {/* Subscribe section */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.75rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 204, 204, 0.3), 0 2px 4px -1px rgba(0, 204, 204, 0.2)",
        }}
      >
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#22d3ee",
            marginBottom: "0.25rem",
            textAlign: "center",
          }}
        >
          Subscribe
        </h3>
        <h4
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "0.5rem",
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Get noticed faster
        </h4>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            lineHeight: "1.25",
            marginBottom: "0.75rem",
          }}
        >
          Join our talent network and be the first to know about new
          opportunities. Recruiters search our database daily for qualified
          candidates.
        </p>
        <button
          style={{
            backgroundColor: "#22d3ee",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            width: "100%",
            fontWeight: "500",
            transition: "background-color 0.2s",
            marginTop: "0.5rem",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#06b6d4")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#22d3ee")}
        >
          Upload your resume
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
