# Techniques to pull data from EvalAI within EvalAI-ngx without using 'git clone' in dockerfile

The techniques for pulling code from EvalAi from within EvalAI-ngx are as follows:

### 1. Using Shared Volumes
Docker allows for mounting local directories into containers using the shared volumes feature. Just use the -v switch to specify the local directory path that you wish to mount, along with the location where it should be mounted within the running container:

`docker run -d -P --name <name of your container> -v /path/to/local/directory:/path/to/container/directory <image name>`

Using this command, the host's directory becomes accessible to the container under the path you specify. This is particularly useful when developing locally, as you can use your favorite editor to work locally, commit code to Git, and pull the latest code from remote branches.

Your application will run inside a container, isolating it away from any processes you have running on your development laptop. The container instance will also have access to other instances, such as those running to provide databases, message brokers and other services.

In this scenario, all containers on the same host would share the same shared codebase and binaries at the same time. Versioning of code should occur within the Docker image, not at the host volume. Therefore, it's not recommended to use shared volumes in production.

### 2. Using the ADD or COPY command
You can use the COPY command within a Dockerfile to copy files from the local filesystem into a specific directory within the container. The following Dockerfile example would recursively add the current working directory into the /app directory of the container image:

```
RUN mkdir /app
COPY . /app
```

The ADD command is similar to the COPY command, but has the added advantage of fetching remote URLs and extracting tarballs.

According to Docker's best practices guide, COPY is recommended for most cases. This technique is recommended for building production-ready Docker images.




#### In summary, use Docker ADD COPY for production and shared volumes for development, while avoiding the use of Git within containers for security reasons. 
