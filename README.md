# Template for documentation

Based on [this](https://github.com/hasura/gatsby-gitbook-starter) project from **hasura**.

## 🚀 Run

Get started by running the following commands:

```
nvm use 18
npm install
npm start
```

### Errors

When you run ```npm start``` you get the following error?

```
Error: ENOSPC: System limit for number of file watchers reached, watch...
```

You need [this](https://github.com/gatsbyjs/gatsby/issues/11406) in terminal (for linux):

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## 🔧 What has changed

<pre>
├── config.js   # MetaData & links was deleted
├── content     # All content in .mdx
├── Dockerfile  # Created for ci/cd
├── src
│    ├── components
│    │   ├── images      # Images used in app
│    │   ├── search      # Algolia search changed to lunr
│    │   ├── sidebar     # Left panel 
│    │   ├── Header.js   # Header
└── static              # Images used in .mdx 
</pre>

### Other language in search

Algolia search changed to [lunr](https://lunrjs.com/guides/getting_started.html).

lunr was not installed as a plugin, but as a file from [this](https://github.com/weixsong/lunr-languages/tree/master) repository. To change the search language, go to the repository, download the **lunr.your_language.js** file and save it to this path:

<pre>├── src
    ├── components
    │   ├── search
</pre>

and replace your_language in **createIndex.js** (the file is in the search folder) file on line 25 and 30.If you want English, just comment out lines 22-25 and 30. If you want to use multiple languages, uncomment lines 24 and 25 and comment out line 30.

```js
22  var lunr = require('./lib/lunr.js');
23  require('./lunr.stemmer.support.js')(lunr);
24  // require('./lunr.multi.js')(lunr);
25  require('./lunr.ru.js')(lunr);
26
27  // Create lunr index
28  const index = lunr(function () {
29    // this.use(lunr.multiLanguage('en', 'ru'));
30    this.use(lunr.ru);
```   

## How use

For information on using components, see on http://localhost:8000/ after ```npm start```.