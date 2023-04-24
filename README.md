docker save hello-world:latest | gzip > hello-world.tar.gz (or) docker save -o hello-world.tar hello-world:latest
docker load < hello-world.tar.gz