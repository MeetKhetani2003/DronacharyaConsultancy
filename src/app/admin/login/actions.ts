'use server';

import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

export async function loginAction(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (username === validUsername && password === validPassword) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_jwt_key_12345');
    const token = await new SignJWT({ user: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);
      
    // Set the cookie properly depending on Next.js 15 cookies API
    // In Next 15, cookies() is async, but wait, if it's < 15, it's synchronous.
    // To be safe for Next 14/15, we await cookies() if we are using Next 15.
    // The user's package.json says next ^16.x or similar? Let's assume it's Next 15/16.
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}
