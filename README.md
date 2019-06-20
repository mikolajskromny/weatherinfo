How to run app in docker container?
1) Be sure you have installed Docekr on your computer
2) Open CMD as administrator where you cloned this repository
3) Paste: "docker build -t weatherinfo ."   	(without the quotes)
4) Wait, it may take about 5 minutes
5) When you see, that you can type something in your CMD paste: "docker run -p 8080:80 weatherinfo"			(without the quotes)
6) Open http://localhost:8080
7) Great! Now you can check my app!
