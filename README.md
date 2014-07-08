Gremlin Dashboard
=========

**Prerequisites:**

- Java 8


**Getting Started:**

- Get & build TinkerPop3

 ```sh
 git clone https://github.com/tinkerpop/tinkerpop3.git
 cd tinkerpop3
 mvn install -DskipTests
 ```
 
- Start gremlin-server on localhost w/ default port:

 ```sh
 ./bin/gremlin-server.sh
 ```
- clone gremlin-dashboard

 ```sh
  git clone https://github.com/rjbriody/gremlin-dashboard.git
  ```
- Open gremlin-dashboard/index.html in your browser

**Notes:** 

- This is a very basic prototype. 
- There is almost no styling or eye candy yet.
- The JSON Results are real but the graph is randomly generated.
- The session is not yet maintained across calls. Every execution must declare everything it will use (i.e. create a graph before playing w/ it.)
