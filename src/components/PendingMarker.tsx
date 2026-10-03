// Shown wherever a value still waits on an owner or legal decision, so a draft
// can never be mistaken for the published version.
const PendingMarker = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-block"
    style={{
      fontSize: 11,
      fontWeight: 600,
      color: "hsl(0, 65%, 45%)",
      border: "1px dashed hsl(0, 65%, 55%)",
      borderRadius: 6,
      padding: "1px 6px",
    }}
  >
    {children}
  </span>
);

export const LegalDraftBanner = () => (
  <div
    className="mb-8"
    style={{
      border: "1px dashed hsl(0, 65%, 55%)",
      borderRadius: 10,
      padding: "12px 16px",
      color: "hsl(0, 65%, 40%)",
      fontSize: 13,
      lineHeight: 1.6,
    }}
  >
    <strong>Draft for legal review.</strong> Not approved for publishing. Items marked in red need
    the owner or a legal adviser to confirm them.
  </div>
);

export default PendingMarker;
