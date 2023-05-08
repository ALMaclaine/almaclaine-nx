import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_PUBLIC_PATHS = ['/', '/sign-in*', '/sign-up*'];

const genIsPublic =
  (publicPaths = DEFAULT_PUBLIC_PATHS) =>
  (path: string) => {
    return publicPaths.find((x) =>
      path.match(new RegExp(`^${x}$`.replace('*$', '($|/|\\.)')))
    );
  };

const isApi = (path: string) => {
  return path.match(new RegExp(`^/api/.*`));
};

const genClerkMiddleware = (publicPaths?: string[]) =>
  withClerkMiddleware((request: NextRequest) => {
    const isPublic = genIsPublic(publicPaths);
    if (isPublic(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // if the user is not signed in redirect them to the sign in page.
    const { userId } = getAuth(request);
    if (!userId) {
      if (isApi(request.nextUrl.pathname)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
        });
      } else {
        // redirect the users to /pages/sign-in/[[...index]].ts
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect_url', request.url);
        return NextResponse.redirect(signInUrl);
      }
    }

    return NextResponse.next();
  });

// Stop Middleware running on static files
const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)',
    '/',
  ],
};

export { config, genClerkMiddleware };
