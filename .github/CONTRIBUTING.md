# Contributing

Welcome to the project! I'm really excited to have you on board, and before we dive into the guidelines, let me share the essence of why this project was created.

## Intention behind building this project

At its core, this project embodies two important aims:

1. **Start Your Open Source Journey**: It's aimed to kickstart your open-source journey. Here, you'll learn the basics of Git and get a solid grip on the MERN stack and I strongly believe that learning and building should go hand in hand.
2. **Diving into React**: Once you've got the basics down, a whole new adventure begins of mastering React. This project covers everything, from simple form validation to advanced performance enhancements. And I've planned much more cool stuff to add in the near future if the project hits more number of contributors.

I'd love for you to make the most of this project - it's all about learning, helping, and growing in the open-source world.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Setting up the Project](#setting-up-the-project)
3. [Request for Changes/Pull Requests](#request-for-changes-pull-requests)
4. [Guidelines to follow](#guidelines-to-follow)

<a name="code-of-conduct"></a>

## Code of Conduct

In our project, we believe in creating an open and inclusive space for everyone. To ensure a respectful and positive community, follow these key guidelines:

1. **Respect Each Other**: Treat all participants kindly and respectfully.
2. **Use Inclusive Language**: Keep your language welcoming and inclusive when communicating.
3. **Accept Constructive Feedback**: Be open to constructive criticism and focus on what's best for the community.
4. **No Unacceptable Behavior**: Avoid behaviors like harassment, trolling, insults, or anything that's inappropriate in a professional setting.

We're committed to maintaining a positive and inclusive community, and your cooperation is crucial for making this a safe and enjoyable space for everyone.

<a name="setting-up-the-project"></a>
# Setting up the Project

To setup the project locally follow the steps:

1. Fork and Star the project.

2. Clone your forked repository.
   ```bash
   git clone https://github.com/YOUR-USERNAME/wanderlust.git
   ```

3. Download the required dependencies
   ```bash
   cd wanderlust
   npm run installer
   ```

4. Set up your databases
   - Make sure you install [ mongodb](https://www.mongodb.com/docs/manual/installation/) and run it on port `27017`

     **Option 1: mongoimport**
     ```bash
     mongoimport --db wanderlust --collection posts --file ./data/sample_posts.json --jsonArray
     ```

     **Option 2: Manual insertion using mongodb compass**
     - Create `wanderlust` db
     - Create a new collection named `posts` in the `wanderlust` db
     - Use **ADD DATA** option in the `posts` collection and use the content from `backend/data/sample_posts.json` file

5. Set up Redis
   - Make sure you [install redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/) and run it in `redis://127.0.0.1:6379`

6. Set up env variables
   ```bash
   cp backend/.env.sample backend/.env && cp frontend/.env.sample frontend/.env.local
   ```

7. Launch the development server with `npm start` in the root directory of the repository.

<a name="request-for-changes-pull-requests"></a>

## Request for Changes/Pull Requests

To contribute to this project, you need to create a fork of the repository and then commit your changes to it. Follow these steps:

1. Fork the repository if haven't done already from [wanderlust](https://github.com/krishnaacharyaa/wanderlust/)
2. Add your fork as a local project:

   ```sh
   # Using HTTPS
   git clone https://github.com/YOUR-USERNAME/wanderlust.git
   ```

   ```sh
   # Using SSH
   git clone git@github.com:YOUR-USERNAME/wanderlust.git
   ```

3. Add git remote controls:

   ```sh
   # Using HTTPS
   git remote add fork https://github.com/YOUR-USERNAME/wanderlust.git
   git remote add upstream https://github.com/krishnaacharyaa/wanderlust.git
   ```

   ```sh
   # Using SSH
   git remote add fork git@github.com:YOUR-USERNAME/wanderlust.git
   git remote add upstream git@github.com:krishnaacharyaa/wanderlust.git
   ```

4. Verify that you have your two git remotes:

   ```sh
   git remote -v
   ```

5. **For every individual PR follow these 2 steps:**

   - To stay up to date with the central repository:

     ```sh
     git pull upstream main
     ```

   - Checkout a private from your main Branch

     ```sh
     # Switch to the main branch
     git switch main

     # Pull down any upstream changes
     git pull

     # Create a new branch to work on
     git switch --create bugfix/1234-name-of-the-issue
     ```

Commit your changes, then push the branch to your fork with `git push -u fork` and open a pull request on [the Wanderlust repository](https://github.com/krishnaacharyaa/wanderlust) following the template provided.

<a name="guidelines-to-follow"></a>

## Guidelines for Contributions

1. **Claiming an Issue**: Before you start working on an issue, make sure it's assigned to you. We do this to avoid overlapping efforts and to ensure your hard work doesn't go to waste. Please avoid raising a PR for an issue assigned to someone else.
2. **Commit Format**: When making commits, follow this format: `tag-#issue-number: <commit-message>`. The tag should be one of these: `fix`, `feat`, `docs`, `chore`, `refactor`.
3. **PR Title**: When creating a Pull Request, the title should be in this format: `tag-#issue-number: <Title-of-PR>`. Again, use the same tags: `fix`, `feat`, `docs`, `chore`, `refactor`.
4. **Coding Standards**: Ensure that your code aligns with our coding standards and guidelines. For example, use naming conventions like `file-name.ts`, not `fileName.ts`.
5. **Selective Staging**: Make sure you stage only the necessary commits when raising a PR.
6. **Rebasing**: Check if your PR is rebased to the latest main/development branch. More details can be found in [Request for Changes/Pull Requests](#request-for-changes-pull-requests).
7. **Use Default PR Template**: Make sure your PR follows our default PR template.

These guidelines help maintain a smooth and organized contribution process. I appreciate your attention to these details, and your contributions are valued. Thanks for being part of our open-source community!! Lets all help each other for mutual growth!!
