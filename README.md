##How to run app locally
- Download the node.js installer for Windows and install it - [NodeJS](https://nodejs.org/en/download/)
  
- Install TypeScript
```shell script
npm install -g typescript
```

- Install Angular
```shell script
npm install -g @angular/cli
```

- Install [git](https://git-for-windows.github.io/) and follow this [instructions](https://www.atlassian.com/git/tutorials/install-git#windows)

- Clone repository to your computer
```shell script
git clone https://github.com/mikolajskromny/weatherinfo.git
```

## Running the application

- Open CMD in repository directory and type:

    - Install all modules
    ```shell script
    npm install
    ```
  
    - Run the app
    ```shell script
    ng serve -o
    ```
  
    - App will open automatically in default browser on [http://localhost:4200/](http://localhost:4200/) 

##How to run app in docker container?
- Be sure you have installed Docker on your computer
- Open CMD where you cloned this repository
- Paste: 
```shell script
docker build -t weatherinfo
```
- Wait, it may take about 5 minutes
- When you see, that you can type something in your CMD paste: 
```shell script
docker run -p 8080:80 weatherinfo
```
- [Click!](http://localhost:8080)
- Great! Now you can check my app!

## How to stop docker container
- Paste:
```shell script
docker ps -a 
```
You will see list of your containers, find `weatherinfo` and look for its NAME
- Then paste:
```shell script
docker stop NAME 
```
