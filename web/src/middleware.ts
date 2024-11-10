import { NextRequest, NextResponse, userAgent } from 'next/server';
import { parse } from './_shared';
import { headers } from 'next/headers';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const value = parse(request);
    const alias = url.pathname.slice(1);
    // console.log('domain::', domain);
    // if (alias) {
    //     try {
    //         // Call the backend API to get the target link
    //         const apiResponse = await fetch(
    //             `https://api-dev.shtcut.co/api/v1/shtner/links/visit/${`shtcut.link`}/${alias}?apiKey=ShtcutAppKey`
    //         );

    //         if (apiResponse) {
    //             const data = await apiResponse.json();

    //             const targetUrl = data.data.target;

    //             if (targetUrl) {
    //                 return NextResponse.redirect(targetUrl);
    //             }
    //         } else {
    //             console.error(`Failed to fetch target URL for alias: ${alias}`);
    //         }
    //     } catch (error) {
    //         console.error(`Error fetching target URL: ${error}`);
    //     }
    // }
    const { device } = userAgent(request);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    url.searchParams.set('viewport', viewport);
    if (url.pathname.match(/^\/(coming-soon)/)) {
        return NextResponse.redirect(new URL('/waitlist', request.url));
    }
    return NextResponse.next();
}
