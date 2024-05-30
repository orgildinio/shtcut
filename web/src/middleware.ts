import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const { device } = userAgent(request);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    url.searchParams.set('viewport', viewport);
    if (url.pathname.match(/^\/(landing|pricing|coming-soon|url-shorten-er|auth)/)) {
        return NextResponse.redirect(new URL('/waitlist', request.url));
    }
    return NextResponse.next();
}
