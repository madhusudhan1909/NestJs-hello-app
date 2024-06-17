 1. Manual Deployment of NestJS HelloWorld on EC2

 Prerequisites:
- An AWS EC2 instance running a Linux-based OS (e.g., Ubuntu).
- SSH access to the EC2 instance configured with a private key.
- Basic knowledge of Linux shell commands.

 Steps:

1. Prepare Your EC2 Instance:
   - Launch an EC2 instance on AWS. Make note of the public DNS (or IP address) and SSH key pair used for access.

2. Connect to Your EC2 Instance:
   - Open your terminal (or use an SSH client like PuTTY on Windows).
   - Use the following command to connect to your EC2 instance:
     bash
     ssh -i "your_private_key.pem" ubuntu@ec2-your-public-dns.compute-1.amazonaws.com
     
   - Replace `your_private_key.pem` with the path to your private key and `ec2-your-public-dns.compute-1.amazonaws.com` with your EC2 instance's public DNS.

3. Install Prerequisites on EC2:
   - Update the package list:
     bash
     sudo apt update
     
   - Install Node.js and npm (if not already installed):
     bash
     sudo apt install nodejs npm
     
     sudo npm install 
     

4. Clone and Deploy Your NestJS Application:
   - Navigate to a directory where you want to deploy your application (e.g., `/home/ubuntu`):
     bash
     cd /home/ubuntu
     
   - Clone your NestJS project from your Git repository (replace `<your_repo_url>` with your actual repository URL):
     bash
     git clone https://github.com/Deepak2202-del/nestjs-hello-world.git
     
   - Navigate into your NestJS project directory:
     bash
     cd /nestjs-hello-world
     
   - Install dependencies and build your project:
     bash
     npm install
     npm run build
     
   - Start your NestJS application using PM2:
     bash
     npm run start
 - Open your web browser and navigate to your EC2 instance's public DNS or IP followed by the appropriate port (default is 3000 for NestJS).

 2. Implementing CI/CD Using GitHub Actions for NestJS

 Prerequisites:
- GitHub repository containing your NestJS project.
- Basic understanding of GitHub Actions.

 Steps:

1. Create a GitHub Actions Workflow:
   - Inside your GitHub repository, create a `.github/workflows` directory if it doesn't exist.
   - Create a YAML file (e.g., `main.yml`) for your GitHub Actions workflow.

2. Define Workflow Triggers:
   - Specify when the workflow should run, for example, on pushes to the `master` branch:
name: CI/CD for NestJS

on:
  push:
    branches:
      - master  # Trigger on pushes to master branch


3. Set Up Workflow Jobs:
   - Define jobs to be executed in your workflow:
     yaml
     jobs:
       build:
         runs-on: ubuntu-latest

         steps:
           - name: Checkout code
             uses: actions/checkout@v2

           - name: Set up Node.js
             uses: actions/setup-node@v2
             with:
               node-version: '14'

           - name: Install dependencies
             run: npm install

           - name: Build
             run: npm run build

           - name: Run tests
             run: npm test
     

4. Add Deployment Step Using SSH Action:
   - Use an SSH action (e.g., `appleboy/ssh-action`) to connect to your EC2 instance and deploy your NestJS application:

    name: CI/CD for NestJS

on:
  push:
    branches:
      - master  # Trigger on pushes to master branch

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm test

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/ubuntu/nestjs-hello-world  
            # Update to the correct path on your EC2 instance
            if [ ! -d .git ]; then
              git init
              git remote add origin https://github.com/Deepak2202-del/nestjs-hello-world.git
            fi
            git fetch origin
            git reset --hard origin/master  # Use the correct branch name
            npm install
            npm run build
            pm2 restart all || pm2 start dist/main.js --name "nest-app"
6. Commit and Push Your Workflow:
   - Save your changes to the YAML file and commit them to your `main` branch.
   - GitHub Actions will automatically trigger the workflow on pushes to `main`, executing the defined steps.
