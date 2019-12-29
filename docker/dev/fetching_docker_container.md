### Alternatives to `git clone` to fetch data from EvalAI

> Note: Some great points have been mentioned in previous PRs on the same topic.
I found those solutions quite good, so I am including them along with the name
of the person who originally came up with the solution.

#### Maintain a separate codebase for the files used
This can be a very useful addition. As the Django container
is common to both EvalAI and EvalAI-ngx projects, it will be helpful to separate
it from the EvalAI codebase. I would like to add here that this can also be
useful in the EvalAI-CLI project where it can be used to setup the API server
to perform integration tests with the server. (See [this PR](https://github.com/Cloud-CV/evalai-cli/pull/210))

Suggested by: @yashdusing

#### Use SVN to download required folders
`svn` can be used to download folders from GitHub. A list of the required files
and folders can be stored somewhere inside the ngx repo.

The process involved is:
1. In the URL to the folder, what is usually `tree/master` should be replaced
with `trunk`. This will be the URL to be used in the `svn` command.
2. The following syntax can be used to download the required folder:
```
svn checkout https://github.com/owner/repo_name/trunk/folder_name
```

Reference: https://stackoverflow.com/questions/7106012/download-a-single-folder-or-directory-from-a-github-repo

#### Host a zip file containing the required data
A zip file can be maintained with the required files. This should be updated by
an automated script whenever an update is made in one of the related files.
`git clone` will be run once on the server, the required files / folders should
be moved and put into the downloadable zip file.
This way, we can run `git clone` once and serve multiple times with it.

#### Summary
* While all three approaches are workable, I think the first one (recommended by Yash)
is the most handy as it allows a lot of flexibility and opens up new possibilities.
* According to the mentioned reply on StackOverflow, *GitHub takes around 30
seconds to convert larger repositories.* Therefore, the feasibility of the second
approach should be checked in practice. 
