import { NextRequest, NextResponse, userAgent } from 'next/server';
import { fetchTargetUrl, isIgnoredPath } from './hooks/link_redirect';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const alias = url.pathname.slice(1);

    if (isIgnoredPath(alias)) {
        return NextResponse.next();
    }

    if (alias) {
        const targetUrl = await fetchTargetUrl(alias);

        if (targetUrl) {
            return NextResponse.redirect(targetUrl);
        }
    }

    const { device } = userAgent(request);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    url.searchParams.set('viewport', viewport);
    if (url.pathname.match(/^\/(coming-soon)/)) {
        return NextResponse.redirect(new URL('/waitlist', request.url));
    }
    return NextResponse.next();
}
