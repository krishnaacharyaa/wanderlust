## Summary
 This PR aims to improve the convenience for users when setting up and running a project. It includes changes to the package.json file, specifically in the scripts section, to streamline the installation of dependencies and the concurrent startup of both frontend and backend components of the project. Additionally, the README.md has been updated to provide clear instructions for new contributors, and a note has been included about this being the first contribution by the author, with a request for feedback.

## Description
In this PR, I have made the following changes to the package.json file to enhance the developer experience:

Added the "ins" script: The "ins" script combines the installation of dependencies for both the frontend and backend, followed by the simultaneous start of both components. This eliminates the need for users to install "concurrently" separately.

{
  "dependencies": {
    "concurrently": "^8.2.2"
  },
  "scripts": {
    "start-frontend": "cd frontend && npm run dev",
    "start-backend": "cd backend && npm start",
    "start": "concurrently \"npm run start-frontend\" \"npm run start-backend\"",
    "install-frontend": "cd frontend && npm i",
    "install-backend": "cd backend && npm i",
    "ins": "npm run i && npm run install-backend && npm run install-frontend"
  }
}

This simplifies the setup process, ensuring that users can get started with the project without the need to manually install "concurrently."

Furthermore, I have updated the README.md with detailed instructions to guide new contributors in setting up and contributing to this project. As a first-time contributor to an open-source program, I would greatly appreciate feedback and guidance from the community.

## Images
N/A


## Issue(s) Addressed
**Closes #11**


## Review Checklist
Please make sure to go through this checklist before submitting your review.

- [x] Make sure the PR title is of format **`tag: Issue Title`**
   - tag should be one of `fix`,`feat`, `docs`, `chore`, `refactor`
   - Ex: `feat: Added responsive design for the home page`
- [x] Ensure the code follows our coding standards and guidelines
   - Ex:  naming conventions should be of form `file-name.ts` not `fileName.ts`
- [x] Ensure that you have staged only the required commits and raised the PR and not included all the files which would be otherwise required for local setup
- [x] Check if the PR is rebased to the latest main/development branch.
- [x] Make sure there are no unnecessary files or debugging artifacts in the PR.


