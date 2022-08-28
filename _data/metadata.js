const url = process.env.URL ?? "https://developerloper.dev";
const title = "DeveloperLoper";

module.exports = {
    en: {
        url,
        title,
        description: "",
        feed: {
            subtitle: "",
            filename: "feed.xml",
            path: "/feed/en.feed.xml",
            id: "developerloper.dev",
        },
        jsonfeed: {
            path: "/feed/en.feed.json",
            url: `${url}/feed/en.feed.json`,
        },
        source: {
            label: 'github',
            link: 'https://github.com/georgialoper/personal-site'
        },
        author: {
            url,
            name: "GLo",
            email: "loper.georgia@gmail.com",
        },
        posts: {
            title: `Posts | ${title}`,
            description: "Blog posts list",
        },
        about: {
            title: `About | ${title}`,
        },
    },
};
