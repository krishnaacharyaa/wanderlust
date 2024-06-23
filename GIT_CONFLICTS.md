## Common QnA

<details>
<summary>
<em>How to Hard Sync local Master with Original Upstream</em>
</summary>

Follow these steps in your main branch
(upstream" is the original repository and "origin" is the fork one) :
- `git checkout main`
- `git pull upstream main`
- `git reset --hard upstream/main`
- `git push origin main --force`
</details>

<details>
<summary>
<em>Why the previous commits of another branch are showing in the new branch</em>
</summary>

When you create a new branch from a particular branch, you'll start from the point where that branch currently is. So all commit history will be there in the new branch as well.

![image showing the working of branches](https://github.com/rushil-b-patel/wanderlust/assets/96254453/1689fdd3-8ee5-4c29-9b69-f2eeed67f96e)

A good rule of thumb is to always create a new branch from the branch that you intend to eventually merge the new branch into (main branch). So if D is intended to be merged into main at some future point in time, create it from the current tip of main.

for more details refer this [blog](https://www.reddit.com/r/git/comments/l7epj0/why_does_my_new_branch_contain_commits_from/)
</details>

<details>
<summary>
<em>Edit a commit</em>
</summary>

  1. `git add `: Add new changes
  2. `git commit --amend --no-edit`: it will combine the new staged files to the last commit.
  
**or**

When calling git reset, you need to specify the commit to reset to or you can specify an ancestor of HEAD, the current commit, using the tilde (~) suffix.
- `git add .`
- `git commit -m "This commit is a mistake"`
- `git reset HEAD~`
- `git add main.py # need to re-add files after reset`
- `git commit -m "This commit corrects the mistake"`

To undo the last two commits, use the commands:
- `git add .`
- `git commit -m "This commit is a mistake"`
- `// make changes`
- `git add .`
- `git commit -m "This commit is another mistake"`
- `git reset HEAD~2`
- `git add .`
- `git commit -m "this commit corrects both mistakes"`

for more info refer this [blog](https://sentry.io/answers/undo-the-most-recent-local-git-commits/)

**or**

- `git commit --amend -m "New commit message"`: it will chnage the last commit message
  ![git ammend showcase](https://github.com/rushil-b-patel/wanderlust/assets/96254453/4c5e73b1-e466-42b4-9053-d7044be4a50e)
for more info, watch this [video](https://www.youtube.com/watch?v=q53umU5vMkk)
</details>


<details>
<summary>
<em>To Check the commit Tree:</em>
</summary>

- Run `gitk` or `gitk --all` to visualize the commit tree.
- `git log` show commit logs.
</details>

-   **Rebase:**
    - `git fetch main`: Fetch the latest changes: 
    - `git rebase upstream/main`: Rebase onto the upstream branch
</details>


- Avoid committing unnecessary files:
    - Avoid using `git commit -a`, which commits everything.
- Use targeted commit commands:
    - Use `git add` to stage specific files.
