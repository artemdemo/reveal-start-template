# Template for reveal.js presentations


## Getting up and running

Download all dependencies (both npm and bower) and run build:

```
$ npm run setup
```

Then you can build it and watch

```
$ npm run build && npm run watch
```


## Create gh-pages branch

Creates our branch, without any parents (it's an orphan!) and switch to the new branch

```
$ git checkout --orphan gh-pages
```

(optional) Remove all files from the old working tree

```
$ git rm -rf .
```

Now you can add your presentation files

Source: https://help.github.com/articles/creating-project-pages-manually/#create-a-gh-pages-branch


## Fonts

I'm using 'Open Sans' (Latin and Cyrillic) from google fonts.

I also added 'font-awesome' (from npm).


## Plans

* Add livereload
