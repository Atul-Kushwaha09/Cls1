# Docker Practical 12

## Objective

This project demonstrates how to build and deploy a simple Node.js application using Docker.

---

## Technologies Used

- Node.js
- Express.js
- Docker
- VS Code

---

## Project Structure

```
cls1/
│
├── app.js
├── package.json
├── Dockerfile
└── README.md
```

---

## Installation

Clone or download the project.

Navigate to the project directory.

```
cd cls1
```

---

## Build Docker Image

```
docker build -t cls1:1.0 .
```

---

## Run Docker Container

```
docker container run -p 3001:3000 cls1:1.0
```

---

## Open in Browser

Visit:

```
http://localhost:3001
```

Expected Output:

```
Hello docker is running
```

---

## Docker Commands

Check Docker Version

```
docker --version
```

List Images

```
docker images
```

List Running Containers

```
docker ps
```

Stop Container

```
docker stop <container_id>
```

Remove Container

```
docker rm <container_id>
```

Remove Image

```
docker rmi cls1:1.0
```

---

## Author

Atul Kushwaha

B.Tech CSE (Data Science)

Docker Practical 12
