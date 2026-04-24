import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { venueProfile } from "../src/lib/venue";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.venue.upsert({
    where: { slug: venueProfile.slug },
    update: {
      name: venueProfile.name,
      tagline: venueProfile.tagline,
      address: venueProfile.address,
      capacity: venueProfile.capacity,
      basePrice: venueProfile.basePrice,
      description: venueProfile.description,
      amenities: venueProfile.amenities,
      rules: venueProfile.rules,
    },
    create: venueProfile,
  });

  const email = process.env.ADMIN_EMAIL ?? "admin@aurorahall.test";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      name: "Venue Manager",
      passwordHash,
    },
    create: {
      email,
      name: "Venue Manager",
      passwordHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
