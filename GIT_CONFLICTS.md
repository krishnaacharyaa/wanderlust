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
<em>Edit a commit</em>
</summary>

- `git reset --soft HEAD~1` gets back to the last commit(for more information refer this [blog](https://www.datacamp.com/tutorial/git-reset-revert-tutorial) )
- or
- `git commit --amend`: ammend the most recent commit.
- `git commit --amend -m "New commit message"` : you can set the commit message directly

</details>


<details>
<summary>
<em>To Check the commit Tree:</em>
</summary>

- Run `gitk` or `gitk --all` to visualize the commit tree.
- `git log` show commit logs.
</details>

<details>
<summary>
<em>Undoing a commit from several commits ago</em>
</summary>

- `git log`
- `git revert [hash of the commit]`
</details>


-   **Rebase:**
    - `git fetch main`: Fetch the latest changes: 
    - `git rebase upstream/main`: Rebase onto the upstream branch
</details>


- Avoid committing unnecessary files:
    - Avoid using `git commit -a`, which commits everything.
- Use targeted commit commands:
    - Use `git add` to stage specific files.
