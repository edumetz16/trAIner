import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Dashboard app ready</h1>
      <Link href="/login">Ir a login demo</Link>
    </main>
  );
}
