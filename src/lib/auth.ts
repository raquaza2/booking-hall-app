import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

const cookieName = "admin_session";
const maxAgeSeconds = 60 * 60 * 8;

function getSecret() {
  return process.env.SESSION_SECRET ?? "local-development-secret";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function verifySignature(payload: string, signature: string) {
  const expected = sign(payload);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export async function createAdminSession(adminId: string) {
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  const payload = `${adminId}.${expiresAt}`;
  const cookieStore = await cookies();

  cookieStore.set(cookieName, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(cookieName)?.value;

  if (!value) {
    return null;
  }

  const [adminId, expiresAt, signature] = value.split(".");
  if (!adminId || !expiresAt || !signature) {
    return null;
  }

  const payload = `${adminId}.${expiresAt}`;
  if (Number(expiresAt) < Date.now() || !verifySignature(payload, signature)) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, name: true },
  });

  return admin;
}

export async function requireAdmin() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
