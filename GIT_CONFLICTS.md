## Common QnA

<details>
<summary>
<em>How can I know if I’m in a bad situation?</em>
</summary>

- Run `gitk` or `gitk --all` to visualize the commit tree.
- Check if `git log` shows any merge commits, indicating a lack of proper synchronization with the upstream branch.
</details>

<details>
<summary>
<em>How to Hard Sync Master with Upstream</em>
</summary>

To hard sync your local master branch with the upstream master branch, follow these steps in your main branch:

- `git remote add upstream /url-to-original-repo`
- `git fetch upstream`
- `git reset --hard upstream/main`
- `git push origin main --force`
</details>

## Better commits

- Avoid committing unnecessary files:
    - Avoid using `git commit -a`, which commits everything.
- Use targeted commit commands:
    - Use `git add` to stage specific files.
    - Use `git add -p` for a patch mode to review changes before staging.
- Ensure changes are correct before committing:
    - Use `git diff --cached` to display staged changes.
    - Use `git commit -v` to view diffs while writing the commit message.

If you want to make sure about what you’re committing, use `git diff --cached` to display the ready-to-commit changes. Also, I like to use `git commit -v`, which displays the diff as a comment, so that I can view it while writing the commit message.

<details>
<summary>
<em>Edit a commit</em>
</summary>

- `git reset --soft HEAD^`: Reset to the previous commit without changing files.
- Edit the necessary changes.
- `git commit -a -v -c ORIG_HEAD`: Recommit with the same message and verify changes.
- After pushing, use force push: `git push -f`.
</details>

<details>
<summary>
<em>What should I do if I’m in a bad situation?</em>
</summary>

-   **Rebase:**
    -   Fetch the latest changes: `git fetch main`
    -   Rebase onto the upstream branch: `git rebase upstream/main`
-   **Remove merge commits:**
    -   Fetch latest changes: `git fetch upstream`
    -   Discard all changes and reset: `git reset --hard upstream/main`
-   **Keep your changes:**
    -   Create a backup branch: `git branch branchname`
    -   Safely reset your branch
    -   Pull changes back to master: `git cherry-pick branchname 1234567890abcdef1234567890abcdef12345678`
</details>

<details>
<summary>
<em>Recovering from a bad merge or accidental deletion</em>
</summary>

- `git reflog`
- `git reset HEAD@{index}`
</details>

<details>
<summary>
<em>Amending the last commit</em>
</summary>

- `git commit --amend --no-edit`
</details>

<details>
<summary>
<em>Changing the last commit message</em>
</summary>

- `git commit --amend`
</details>

<details>
<summary>
<em>Undoing a commit from several commits ago</em>
</summary>

- `git log`
- `git revert [saved hash]`
</details>