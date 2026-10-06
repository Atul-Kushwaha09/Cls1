# CloudPulse

CloudPulse is a polished, container-ready deployment dashboard for the cloud computing batch. It turns a basic Express “hello world” into a small but realistic cloud-native service: the browser dashboard reads live runtime data from an API, while Docker provides an isolated, health-checked production runtime.

## What this demonstrates

- **Containerization:** a small Node.js service packaged with Docker
- **Observability:** health, uptime, memory, CPU, release, and host information
- **API design:** JSON endpoints under `/api`
- **Production basics:** non-root container user, `npm ci`, health checks, graceful shutdown
- **Responsive UI:** works on desktop and mobile without a frontend build step

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Useful endpoints:

| Endpoint | Purpose |
| --- | --- |
| `/api/health` | Load-balancer and Docker health probe |
| `/api/metrics` | Uptime, memory, release, and availability data |
| `/api/info` | Node version, CPU count, and container hostname |

## Run with Docker

```bash
docker build -t cloudpulse:2.0 .
docker run --name cloudpulse -p 3001:3000 \
  -e NODE_ENV=production \
  -e REGION=asia-south1 \
  -e RELEASE=2.0.0 \
  cloudpulse:2.0
```

Then open [http://localhost:3001](http://localhost:3001). Confirm the container is healthy:

```bash
docker ps
curl http://localhost:3001/api/health
docker stop cloudpulse
docker rm cloudpulse
```

## Project structure

```text
.
├── app.js              # Express server and observability API
├── public/
│   ├── index.html      # Dashboard markup
│   ├── styles.css      # Responsive visual system
│   └── app.js          # Browser data refresh
├── Dockerfile           # Secure production image
└── .dockerignore
```

## Demo talking points

1. Build once and run the same image in any Docker-compatible cloud.
2. The `/api/health` endpoint lets an orchestrator automatically remove unhealthy containers.
3. Environment variables make the release and region portable between local, staging, and production.
4. The non-root user and `npm ci --omit=dev` reduce the container’s attack surface and size.

Built by Atul Kushwaha · B.Tech CSE (Data Science)
