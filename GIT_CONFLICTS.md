## Common QnA

<details>
<summary>
<em>How to Hard Sync local Master with Original Upstream</em>
</summary>

Follow these steps in your main branch
(upstream" is the original repository and "origin" is the fork one) :
- ```sh
  git checkout main
  git pull upstream main
  git reset --hard upstream/main
  git push origin main --force
  ```
</details>

<details>
<summary>
<em>Why the previous commits of another branch are showing in the new branch</em>
</summary>

Let's say you have this repository with branch 'prev_branch'

```sh
---o---o---A    prev_branch
```

Let's say you commit something A in prev_branch and created new branch 'new_branch'1, 
it won't differ until you start commiting to new branch 

```sh
---o---o---A    prev_branch + new_branch
```

Then you commit B in newbranch 

```sh
---o---o---A      prev_branch
            \
             B    new_branch
```

The new commit B has A as its parent commit. Now prev_branch and new_branch differ in some way.

```sh
---o---o---A---X---Y    prev_branch
            \
             B---Z      new_branch
```
## Summary

When you create a new branch from a particular branch, you'll start from the point where that branch currently is. So all commit history will be there in the new branch as well.</br>
A good rule of thumb is to always create a new branch from the branch that you intend to eventually merge the new branch into (main branch). So if D is intended to be merged into main at some future point in time, create it from the current tip of main.

For more details refer [blog](https://www.reddit.com/r/git/comments/l7epj0/why_does_my_new_branch_contain_commits_from/) / [blog](https://stackoverflow.com/questions/37010110/git-pushes-old-commit-in-different-branch-to-new-branch/78666984#78666984)

Follow this while creating new branch and commiting changes:
```sh
- git checkout main/master
- git branch -b new_branch
- git add .
- git commit -m "message"
```

</details>

<details>
<summary>
<em>Edit a commit</em>
</summary>


1. Convenient way to modify the most recent commit
   ```sh
    # Edit src.js and main.js
    git add src.js
    git commit 
    # Realize you forgot to add the changes from main.js 
    git add main.js 
    git commit --amend --no-edit
   ```
2. Using git reset
   ```sh
    git add .
    git commit -m "This commit is a mistake"
    git reset HEAD~
    git add main.js
    git commit -m "This commit corrects the mistake"
    ```

3. To undo the last two commits, use the commands:
   ```sh
   git add
   git commit -m "This commit is a mistake"
   # make changes to files
   git add .
   git commit -m "This commit is another mistake"
   # want to go back to 2nd last commit to make changes
   git reset HEAD~2
   # make changes
   git add .
   git commit -m "this commit corrects both mistakes"
   ```
   for more info refer this [blog](https://sentry.io/answers/undo-the-most-recent-local-git-commits/)

 4. Change the last commit message
    ```sh
    # it will change the last commit's message
    git commit --amend -m "New commit message" 
    ```
    ![git ammend showcase](https://github.com/rushil-b-patel/wanderlust/assets/96254453/4c5e73b1-e466-42b4-9053-d7044be4a50e)
    for more info, watch this [video](https://www.youtube.com/watch?v=q53umU5vMkk)
</details>


<details>
<summary>
<em>To Check the commit Tree:</em>
</summary>
  
  ```sh
  #Run below to visualize the commit tree.
  gitk 
  git log show commit logs.
  ```
</details>

<details>
<summary>
<em>Rebase</em>
</summary>
  
  ```sh
  #Fetch the latest changes
  git fetch main
  #Rebase onto the upstream branch
  git rebase upstream/main`
  ```
</details>

<details>
<summary>
<em>Good Practice</em>
</summary>
  
  1. Avoid committing unnecessary files:

     ```sh
     #Avoid using which commits everything.
     git commit -a
     ```
     
  2. Use targeted commit commands:
     ```sh
     git add specific file
     ```    
</details>