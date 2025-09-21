import Link from 'next/link';

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="skip-link"
    >
      Skip to main content
    </Link>
  );
}
