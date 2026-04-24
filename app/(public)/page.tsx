import LandingClient from './LandingClient';
import { prisma } from '@/lib/prisma';

// Page.tsx
export default async function Page() {
  const [journals, team, about] = await Promise.all([
    prisma.journal.findMany({ orderBy: { id: 'asc' } }),
    prisma.team.findMany({ orderBy: { id: 'asc' } }),
    prisma.aboutConfig.findFirst()
  ]);

  // Mengirim props 'journals' dan 'team'
  return <LandingClient journals={journals} team={team} about={about} />;
}
