# Methodology To Use Django Without Cloning Full Repo

As per the docker general guidelines and recommendation, the image defined by your docker file should generate containers that are as ephemeral as possible. By “ephemeral", this means that the container can be stopped and destroyed, and then rebuilt and replaced with an absolute minimum setup and configurations. In the docker-compose.yml , you are building the container image using the docker file multiple times. Also, as per the development setup instruction for EvalAi-ngx from readme.md file, the git repository is cloned into a file created in the user’s physical drive. So, I did some research and here are some of my thoughts.

**Proposal #1**:

Since the repository already exists in the system, instead of cloning the repository again to build the container, the repository can be copied from the cloned physical location. EX. If the repository is saved under a file called EvalAiNgx, adding the command COPY ./EvalAiNgx /code in the dockerfile will copy the repository instead of cloning it again. Also you can exclude the files, that are not necessary to run the program using  .dockerignore file command. This way, the script can run without using the entire repository. EX. If all files named temp need to be ignored when running the script, using the command */temp* will exclude all instances of files named temp.

**Proposal #2**:

This method is the same as copying, but we can mount our project directories once they are cloned to the user system defined in docker-compose.yml. You can see the instruction on [how to mount directories](https://docs.docker.com/storage/volumes). Also, it is easier and much faster to work with the code when you mount the directories.

**Proposal #3**:

Use wget to get the copy from the GitHub repo. This can be defined in the docker file. When I did my research, I came across a person who used this method and says that this is a reliable method. [Ref](https://firepress.org/en/best-practices-for-getting-code-into-a-container)
