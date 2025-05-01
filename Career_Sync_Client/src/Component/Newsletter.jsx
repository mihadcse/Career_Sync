import React from "react";

const NewsLetter = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem" ,
      }}
    >
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
          Face Problems using our website?
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            lineHeight: "1.25",
            marginBottom: "0.75rem",
          }}
        >
          If you are facing any problems using our website, please feel free to
          reach out to us. We are here to help you with any issues or concerns.
          Also if you have any suggestions or feedback, we would love to hear
          from you.
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
        <a
          href="mailto:shmihad40@gmail.com"
          style={{
            color: "#22d3ee",
            textDecoration: "none",
            fontWeight: "600",
            display: "block",
            textAlign: "center",
          }}
        >
          shmihad40@gmail.com
        </a>
      </div>
    </div>
  );
};

export default NewsLetter;