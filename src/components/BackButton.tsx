// ============================================================================
// FILE: src/components/BackButton.tsx
// DESCRIPTION: Shared "Switch view" button used across all portfolio views
// ============================================================================

interface BackButtonProps {
  onBack: () => void;
}

export default function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      onClick={onBack}
      className="back-button"
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#888',
        padding: '0.5rem 1.2rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '0.8rem',
        transition: 'all 0.2s ease',
        letterSpacing: '0.5px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
        e.currentTarget.style.color = '#ccc';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.color = '#888';
      }}
    >
      ← Switch view
    </button>
  );
}
