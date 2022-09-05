module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/event/me',
            handler: 'event.me',
            config: {
                //auth: false,
                //policies: ['is-me'],
            },
        },
    ],
};