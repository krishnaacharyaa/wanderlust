# Wanderlust Project

## Overview
Welcome to the Wanderlust project! This is a collaborative effort to build an amazing application. We appreciate your contributions and aim to make the process as smooth as possible.

## Common QnA for Git and Open Source Contributions

<details>
<summary>

### How can I know if I’m in a bad situation?
</summary>
I suggest you to run  **`gitk`**  or  **`gitk --all`**. The commit tree should be self-explainatory.

Also, if  **`git log`**  shows you any merge commits, this means that it isn’t properly synced with the upstream branch
</details>

### How to Hard Sync Master with Upstream
To hard sync your local master branch with the upstream master branch, follow these steps in your main branch:
```
git remote add upstream /url-to-original-repo
git fetch upstream
git reset --hard upstream/main  
git push origin main --force 
```
## Better commits

You should not push what is not needed. Doing  **`git commit -a`**, instead, commits just everything. This, often, is bad.  
You’d better use  **`git add`**  and, most of all,  **`git add -p`**  
**`-p`**  stays for “patch”: it will ask, for each “block” of code which you could commit, if you really want to commit it.  
It is very simple to use, and will make you more responsible about what you’re commiting.

If you want to make sure about what you’re commiting, use  **`git diff --cached`**, it will display the ready-to-commit changes.  
Also, I like to use  **`git commit -v`**, which displays the diff as a comment, so that I can view it while writing the commit message.

## Edit a commit
Sometimes you committed something, but someone asks you to fix something, or you want to fix something yourself. Instead of making a new commit, you can also edit the previous commit(s).

**`git reset --soft HEAD^`**  (will reset the commit history to the previous commit. The —soft option makes sure the files don’t get reset too)  
Then edit whatever you want to edit  
**`git commit -a -v -c ORIG_HEAD`**  (recommits with the same commit message. Because of the -v option, you can check if everything goes well)

If you do this after pushing, you’ll have to use  **`git push -f`**  next time you try to push.

## What should I do if I’m in a bad situation?

[](https://github.com/emesene/emesene/wiki/GitHowTo#what-should-i-do-if-im-in-a-bad-situation)

rebase.  
Just do **`git fetch main`**  (fetch the latest changes from the upstream branch)  
**`git rebase upstream/main`**  (rebase upon the upstream branch)

Sometimes, if you have any merge commits in your branch, this won’t work. The best way to get rid of them is using  **`git fetch upstream`**  (this will fetch the latest changes of the upstream branch) and then do  **`git reset --hard upstream/main`**. BE  AWARE  THAT  THIS  WILL  THROW  AWAY  ALL  YOUR  CHANGES.

If you want to keep your changes, you can put them in a different branch first  **`git branch branchname`**. Now you’ll have a branch with your committed changes backed up. It’s now safe to reset. If you want to pull the changes back to your master branch, you could use  **`git cherry-pick branchname 1234567890abcdef1234567890abcdef12345678`**, where 1234567890abcdef1234567890abcdef12345678 is the commit you want in your master branch.


### Recovering from a bad merge or accidental deletion
```
git reflog
git reset HEAD@{index}
```
### Amending the last commit
```
git commit --amend --no-edit
```

### Changing the last commit message
```
git commit --amend
```

### Undoing a commit from several commits ago
```
git log
git revert [saved hash]
```