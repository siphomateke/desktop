module.exports = {
    packagerConfig: {
        icon:               './build/icon',

        //mac specific
        appCategoryType:    'public.app-category.productivity',
        appCopyright:       '© 2013-2019 Mussabekov Rustem',
        appBundleId:        'io.raindrop.macapp',
        osxSign: {
            hardenedRuntime:    true,
            'gatekeeper-assess':   false,
            entitlements:       './build/entitlements.mac.plist',
            'entitlements-inherit':'./build/entitlements.mac.plist'
        },
        osxNotarize: {
            appleId:            process.env['APPLE_ID'],
            appleIdPassword:    process.env['APPLE_ID_PASSWORD']
        },
        
        asar:               true,
        prune:              true,
        ignore: [
            /^build$/,
            /^out$/,
            /^\.gitignore$/,
            /^\.git$/,
            /^\.idea$/,
            /^forge\.config\.js$/,
            /^tsconfig\.json$/,
            /^yarn\.lock$/,
            /^\.DS_Store$/,
        ],
    },
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: [
                'darwin'
            ]
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                name:       'Raindrop',
                background: './build/dmg@2x.png',
                format:     'ULFO',
                icon:       './build/icon.icns',
                iconSize:   128,
                overwrite:  true,
                contents: options => ([
                    {x: 530, y: 245, type: 'link', path: '/Applications'},
                    {x: 259, y: 245, type: 'file', path: options.appPath},
                ]),
                additionalDMGOptions: {
                    window: {size: {width: 780, height: 435}}
                },
            }
        },
        {
            name: '@electron-forge/maker-appx'
        }
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'raindropio',
                    name: 'desktop'
                },
                draft: process.env['GITHUB_WORKFLOW'] ? false : true, //only github builds are publicly visible
                prerelease: false
            }
        }
    ]
}