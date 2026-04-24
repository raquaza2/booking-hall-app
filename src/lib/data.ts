import { prisma } from "./prisma";
import { venueProfile } from "./venue";

export async function ensureVenue() {
  return prisma.venue.upsert({
    where: { slug: venueProfile.slug },
    update: {},
    create: venueProfile,
  });
}

export async function getVenue() {
  const venue = await prisma.venue.findUnique({
    where: { slug: venueProfile.slug },
  });

  return venue ?? ensureVenue();
}
