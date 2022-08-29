---
title: Automate release notifications with semantic-release-slack-bot
description: Sometimes, even a description is too much
date: 2022-08-29
tags:
  - libraries
  - semantic-release
layout: layouts/post.njk
---

[Semantic release](https://github.com/semantic-release/semantic-release) is an well-documented, easy to use, library for automated version management and package publishing. It automates the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package.

Each release step is implemented by configurable [plugins](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/plugins.md). This allows for support of different commit message formats, release note generators and publishing platforms.

---

Of particular interest is the [semantic-release-slack-bot](https://github.com/juliuscc/semantic-release-slack-bot) plugin, which automates posting release notifications to a slack channel from a slack bot.

Setting this up is super easy, but comes with some gotchas.


## Add the plugin to your project

```
$ yarn add -D semantic-release-slack-bot
```

## Configure the plugin in your semantic-release configuration file

If you've just been using your `package.json` file to configure semantic release, you'll want to create a `.releaserc` [configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration) at this point.

This file can be written in YAML or JSON, with optional extensions: `.yaml`, `.yml`, `.json`, `.js`.

I prefer `.js` to resemble to `.json` format most semantic-release documentation uses while allow comments.

### Re-configure the default semantic-release steps

Skip this step if you already have a semantic release configuration file set up.

```js
// .releaserc.js
module.exports = {
    branches: [], // your release branch configuration
    plugins: [
        /**
         * These four plugins are already part of semantic-release and are listed in order of execution. They do not have to be installed separately:
         *
         * @see: https://semantic-release.gitbook.io/semantic-release/usage/plugins#default-plugins
         */
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/github',
    ],
}
```

### Configure the semantic-release-slack-bot plugin

I only wanted notifications for successful relases on my `main` branch.

View all the plugin's [options](https://github.com/juliuscc/semantic-release-slack-bot#options) to fine-tune your configuration.

```js
// .releaserc.js
module.exports = {
    ...
    plugins: [
        ... // default plugins
        /**
         * Plugin to get release notifications on slack from a slack bot
         *
         * @see: https://github.com/juliuscc/semantic-release-slack-bot
         */
        [
        'semantic-release-slack-bot',
        {
            branchesConfig: [
            {
                pattern: 'main',
                notifyOnSuccess: true,
                notifyOnFail: false,
            },
            ],
        },
        ],
    ],
}
```


### Add the semantic-release slack app to your slack workspace.

Follow [this link](https://slack.com/oauth/authorize?client_id=605439709265.611687593109&scope=incoming-webhook). This may require approval by your workspace admin.

Once the app is installed in your workspace, you'll have to add it to the channel you'd like to post to.

### Configure the slack webhook url

Once you've added the semantic-release slack app to a channel, you should be taken to a page with a webhook to post to this channel. Copy this url and add it to the `slackWebhook` option in your configuration file.

```js
// .releaserc.js
module.exports = {
    ...
    plugins: [
        [
        'semantic-release-slack-bot',
        {
            /**
             * url to post to #my-channel
             **/
            slackWebhook: "https://my-webhook.com", // replace with the copied url
            branchesConfig: [...],
        },
        ],
    ],
}
```

### Configure the release notes format

By default, [semantic-release-slack-bot does not format the default slack message with slack-friendly markdown](https://github.com/juliuscc/semantic-release-slack-bot/issues/44).

To properly format the release notification, we'll need to set `markdownReleaseNotes` to `true`.

```js
// .releaserc.js
module.exports = {
    ...
    plugins: [
        [
        'semantic-release-slack-bot',
        {
            markdownReleaseNotes: true,
            ...
        },
        ],
    ],
}
```

## Conclusion

We did it 🎉

New releases should now trigger a post to your slack channel containing the current version and release notes.

<br/>
    <img src="/static/images/semantic-release-slackbot/screenshot-success.png" alt="a screenshot of an example semantic release slack message" />
<br/>
