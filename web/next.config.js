/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });
        return config;
    },
    images: {
        domains: ['img.youtube.com', 'images.unsplash.com', 'example.com', 'i.imgur.com']
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/landing',
                permanent: true
            },
            {
                source: '/app',
                destination: '/app/dashboard',
                permanent: true
            }
        ];
    }
};
