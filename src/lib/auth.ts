import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

export interface SessionData {
  userId: string;
  loginAt: number;
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'default-secret-key';
}

function encodeSession(data: SessionData): string {
  const payload = JSON.stringify(data);
  const secret = getSecret();
  // Simple encoding: base64(payload) + '.' + base64(hmac-like signature)
  const payloadBase64 = Buffer.from(payload).toString('base64');
  const signature = Buffer.from(secret + payloadBase64).toString('base64');
  return `${payloadBase64}.${signature}`;
}

function decodeSession(token: string): SessionData | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    if (!payloadBase64 || !signature) return null;

    const secret = getSecret();
    const expectedSignature = Buffer.from(secret + payloadBase64).toString('base64');

    if (signature !== expectedSignature) return null;

    const payload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(payload) as SessionData;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<string> {
  const sessionData: SessionData = {
    userId,
    loginAt: Date.now(),
  };

  const token = encodeSession(sessionData);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: false, // HTTP 환경에서도 작동하도록 설정
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return token;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const session = decodeSession(token);

  if (!session) return null;

  // Check if session is expired (24 hours)
  if (Date.now() - session.loginAt > SESSION_MAX_AGE * 1000) {
    return null;
  }

  return session;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function verifyCredentials(id: string, password: string): boolean {
  const adminId = process.env.ADMIN_ID || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  return id === adminId && password === adminPassword;
}

export function getSessionFromToken(token: string): SessionData | null {
  return decodeSession(token);
}
