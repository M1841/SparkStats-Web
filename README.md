# SparkStats Web

> The Spotify Developer platform now requires all developers to have Premium accounts, which I don't have since I've stopped using the service
> 
> Due to this, and my gradual loss of interest in Spotify-related topics, ***I will no longer be maintaining this project*** and ***the live deployment will no longer be usable***
> 
> If you found this project useful and have a Spotify Premium account, feel free to ***create a fork and host your own version***

Web-based user interface for a music statistics platform.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager)
- [pnpm](https://pnpm.io/installation) or another JS package manager
- a SparkStats API instance (get one from [GitHub](https://github.com/m1841/sparkstats-api) or [GitLab](https://gitlab.com/mihai_muresan/sparkstats-api))

## Configuration

Create a `.env` file with the url of you API

```bash
BACKEND_URL=http://localhost:8080
PORT=4200
```

## Running the program

- as a local Angular app (must have Node.js and pnpm installed)

```bash
./start
```

- same as above but with hot-reloading enabled

```bash
./start -w # or ./start --watch
```
