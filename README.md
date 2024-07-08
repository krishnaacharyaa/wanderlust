<div>
  <h1>Wanderlust</h1>
  <h2>The Ultimate Travel Blog 🌍✈️ for You </h2>
</div>

![Preview Image](https://github.com/krishnaacharyaa/wanderlust/assets/116620586/17ba9da6-225f-481d-87c0-5d5a010a9538)

<hr>

<div>
  <h2>🔗 Important Links</h2>
</div>

<table border="1">
  <tr>
      <td><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/5ca6c472-5c73-41b2-a2df-389cc3e14881.png" alt="Discord Logo" width="50"></td>
      <td><a href="https://discord.gg/FEKasAdCrG"> Join our project's Discord Channel here </a></td>
  </tr>
  <tr>
      <td><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/ffda08c0-3c7a-46b0-b7ac-6bc374184ec7.png" alt="Figma Logo" width="50"></td>
      <td><a href="https://www.figma.com/file/zqNcWGGKBo5Q2TwwVgR6G5/WanderLust--A-Travel-Blog-App?type=design&node-id=0%3A1&mode=design&t=c4oCG8N1Fjf7pxTt-1"> Find our project's Figma links here</a></td>
  </tr>
  <tr>
      <td><img src="https://github.com/krishnaacharyaa/wanderlust/assets/133582566/47d71dd6-0390-479e-9d4e-3f077ef1a987.png" alt="YouTube Logo" width="50"></td>
      <td><a href="https://youtu.be/ANfC1u_N_A0?feature=shared"> Find our Collaboration Video with TrainwithShubham here </a></td>
  </tr>
</table>

<hr>

<div>
  <h2><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/4a07b161-b8d6-4803-804a-3b0db699023e" width="35" height="35"> Goal of this project </h2>
</div>

At its core, this project embodies two important aims:

1. **Start Your Open Source Journey**: It's aimed to kickstart your open-source journey. Here, you'll learn the basics of Git and get a solid grip on the MERN stack and I strongly believe that learning and building should go hand in hand.
2. **React Mastery**: Once you've got the basics down, a whole new adventure begins of mastering React. This project covers everything, from simple form validation to advanced performance enhancements. And I've planned much more cool stuff to add in the near future if the project hits more number of contributors.

_We want you to get the most out of this project—it's all about learning, contributing, and growing in the open-source community._
<hr>

<div>
  <h2><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/1ee5934a-27be-4502-a7bf-e6a8c78fe5a3" width="35" height="35"> Features</h2>
</div>

- **Featured Posts :** Highlight top travel stories and destinations on the homepage to showcase the best content and inspire readers with exciting travel experiences.
- **User-Friendly Interface:** Navigate effortlessly through captivating travel content with our intuitive design.
- **Discover By topic categories:** **Discover by Topic Categories**: Explore diverse travel experiences categorized by travel, nature, city, Adventure and Beaches..
- **Environment Setup Step :** 
- Setting Up Project After Git Clone
- 
1. Clone Repository:

**#git clone https://github.com/krishnaacharyaa/wanderlust**
> Clones the "wanderlust" repository from the provided GitHub URL.

2. Navigate to Cloned Directory:

**#cd wanderlust/**
> Changes the current directory to the "wanderlust" directory.

3. List Directory Contents:

**#ls**
> Lists contents of the current directory.

4. Install Node Version Manager (NVM):

**URL for installation---> https://nodejs.org/en/download/package-manager**

**#curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash**
> Installs Node Version Manager (NVM) for managing Node.js versions.

5. Install Node.js version 21:

**#nvm install 21**
> Installs Node.js version 21 using NVM.

6. Verify Node.js and npm Installation:

**#node -v**

**#npm -v**
> Checks installed versions of Node.js and npm.

7. Navigate to Backend Directory:

**#cd wanderlust/backend/**
> Moves to the "backend" directory.

8. Install Backend Dependencies:

**#npm i**
> Installs Node.js dependencies for the backend.

9. Install MongoDB:

> URL for installation of Mongodb
**https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/**

**#sudo apt-get install gnupg curl**

**#curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor**
   
**#echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list**   

**#sudo apt-get update**

> Installs MongoDB for the backend.
**#sudo apt-get install -y mongodb-org**

>  Starts the MongoDB service.
**#sudo systemctl start mongod**

> to access the mongodb.
**#mongosh**

10. Import Sample Data to MongoDB: on this path /wanderlust/backend

**#mongoimport --db wanderlust --collection posts --file ./data/sample_posts.json --jsonArray**

11. Set Up Environment Variables:

**#cp .env.sample .env**
> Copies the sample environment file.

12. View Environment Variables:

**#cat .env**

13. Start Backend Server:

**#npm start**
> Initiates the backend server.

14. Navigate to Frontend Directory:

**#cd ../frontend/**
> Moves to the "frontend" directory.

15. Install Frontend Dependencies:

**#npm i**
> Installs dependencies for the frontend.

16. Create Local Environment File for Frontend:

**#cp .env.sample .env.local**
> Creates a local environment file for the frontend.

17. Start Frontend Development Server:

**#npm run dev**
> Launches the development server for the frontend.

18. Run Frontend Server with Specific Host:

**#npm run dev -- --host**
> Starts frontend server with a specific host.


<hr>

<div>
  <h2><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/90f3930e-5a12-4a4e-8ac9-0dc7d5396adb" width="35" height="35"> Ready to Contribute?</h2>
</div>

Kindly go through [CONTRIBUTING.md](https://github.com/krishnaacharyaa/wanderlust/blob/main/.github/CONTRIBUTING.md) to understand everything from setup to contributing guidelines.

If you would like to contribute to the project, please follow our contribution guidelines.

<hr>
<!-- Open Source Programs -->
  <div>
    <h2><img src="https://github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/blob/master/Emojis/Hand%20gestures/Flexed%20Biceps.png?raw=true" width="35" height="35" > Open Source Programs</h2>
  </div>

  <table border="1" cellpadding="10">
        <tr>
            <td rowspan="2">
                <img src="https://github.com/Meetjain1/wanderlust/assets/133582566/21b2bc42-bdd5-487a-a083-1b262c2f6d9b" alt="GSSOC Logo" width="100" height="55">
            </td>
            <td>
                <strong>GSSOC 2024</strong>
            </td>
        </tr>
        <tr>
            <td>
                This project is part of GirlScript Summer of Code. We warmly welcome contributions from the community to help elevate Wanderlust.
            </td>
        </tr>
    </table>

<hr>

<!-- Code of conduct -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" width="35" height="35"> Code of Conduct</h2>
</div>

Please note that this project is released with a [Contributor Code of Conduct](.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

<hr>

<!-- License -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20with%20Curl.png" width="35" height="35"> License</h2>
</div>

This project is licensed under the [MIT License](./LICENSE).

<hr>

<div>
  <h2><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/af38ec84-7387-4af7-af85-8f408a4654e9" width="35" height="35"> Show Your Support</h2>
</div>

If you find this project interesting and inspiring, please consider showing your support by starring it on GitHub! Your star goes a long way in helping me reach more developers and encourages me to keep enhancing the project.

Feel free to get in touch with me for any further queries or support, happy to help :)

<hr>

 <!-- Cotributors -->
<div>
  <h2><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/20610b38-b287-4bf0-8f28-932b9c76163d" width="40" height="40"> Contributors</h2>
</div>

We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating Wanderlust to greater heights. 😊

<div>
<a href="https://github.com/krishnaacharyaa/wanderlust/graphs/contributors">
  <img width="90%" src="https://contrib.rocks/image?repo=krishnaacharyaa/wanderlust" />
</a>
</div>
