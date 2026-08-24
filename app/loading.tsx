export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: "10px",
        color: "var(--c-ink3)",
        fontSize: "14px",
      }}
    >
      <span className="spinner" style={{ width: 20, height: 20, borderWidth: 3 }} />
      Loading…
    </div>
  );
}
