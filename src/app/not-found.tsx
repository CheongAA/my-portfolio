import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <p className="text-[8rem] font-medium leading-none tracking-tight text-primary/10 select-none">
        404
      </p>
      <h1 className="mt-4 text-2xl font-medium text-primary">Page not found</h1>
      <p className="mt-3 text-secondary text-sm">
        The page you requested doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
