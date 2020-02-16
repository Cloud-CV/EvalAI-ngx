FROM python:3.6.5

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y

RUN mkdir /code

RUN git clone --single-branch --branch delete_participant_and_host_feature https://github.com/Kajol-Kumari/EvalAI /code/

WORKDIR /code

RUN pip install -r requirements/dev.txt

CMD ["./docker/wait-for-it.sh", "db:5432", "--", "sh", "/code/docker/dev/django/container-start.sh"]

EXPOSE 8000
