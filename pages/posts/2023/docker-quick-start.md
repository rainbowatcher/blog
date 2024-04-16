---
layout: post
title: Docker 常用的容器启动命令
subtitle:
date: 2022-08-12
permalinkPattern: /post/:year/:month/:day/:slug/
headerImage: /img/docker.png
useHeaderImage: true
hide: false
tags: [Docker, Container]
---

## MySQL [<Badge type="tip" text="tags" vertical="middle"/>](https://hub.docker.com/_/mysql/tags)

```shell
id=$(docker ps -aqf 'name=mysql5.7$');[ $id ] && docker rm $id
docker run -tid \
  --name mysql5.7 \
  -v ~/DockerVolumes/mysql:/var/lib/mysql \
  -v ~/DockerVolumes/mysql-conf:/etc/mysql/conf.d/ \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123123 \
  -d mysql:5.7
```

## Portainer [<Badge type="tip" text="tags" vertical="middle"/>](https://hub.docker.com/r/portainer/portainer/tags)

[portainer.io](http://portainer.io/) 一个可视化的 Docker 管理工具

```bash
docker volume create portainer_data
docker run -d \
  -p 8000:8000 \
  -p 9000:9000 \
  -e TZ=Asia/Shanghai \
  --name=portainer \
  --restart=always \
  -v ~/DockerVolumes/portainer_data/docker.sock:/var/run/docker.sock \
  -v ~/DockerVolumes/portainer_data:/data \
  portainer/portainer-ce
```

update：

```sh
docker stop portainer
docker rm portainer
docker pull portainer/portainer-ce:latest
docker run -d \
  -p 8000:8000 \
  -p 9000:9000 \
  -e TZ=Asia/Shanghai \
  --name=portainer \
  --restart=always \
  -v ~/DockerVolumes/portainer_data/docker.sock:/var/run/docker.sock \
  -v ~/DockerVolumes/portainer_data:/data \
  portainer/portainer-ce
```

## Redis [<Badge type="tip" text="tags" vertical="middle"/>](https://hub.docker.com/_/redis/tags)

```shell
docker run -tid \
  --name redis \
  -e TZ=Asia/Shanghai \
  -p 6379:6379 \
  redis
```

## ElasticSearch [<Badge type="tip" text="tags" vertical="middle"/>](https://hub.docker.com/_/elasticsearch/tags)

```shell
docker network create elk
id=$(docker ps -aqf 'name=elasticsearch7$');[ $id ] && docker stop $id;docker rm $id
docker run -d \
  --name elasticsearch7 \
  --net elk \
  -e TZ=Asia/Shanghai \
  -v ~/DockerVolumes/elk/es:/usr/share/elasticsearch/data \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  elasticsearch:7.7.0
```

## Kibana [<Badge type="tip" text="tags" vertical="middle"/>](https://hub.docker.com/_/kibana/tags)

```shell
# 7.7.0
docker run -d \
  --name kibana7 \
  --net elk \
  -e TZ=Asia/Shanghai \
  -p 5601:5601 \
  -v ~/DockerVolumes/elk7/kibana/config:/usr/share/kibana/config \
  kibana:7.7.0
```

## Uptime-kuma [<Badge type="tip" text="Github" vertical="middle"/>](https://github.com/louislam/uptime-kuma)

Uptime-kuma 是一款自托管的可视化监控工具。

```shell
docker pull louislam/uptime-kuma:1
docker stop uptime-kuma
docker rm uptime-kuma

docker run -d \
  -p 3001:3001 \
  -e TZ=Asia/Shanghai \
  -v ~/DockerVolumes/uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1
```

## OpenGrok

OpenGrok 是一个源代码查看的工具，感觉优势主要是轻量吧。

```shell
docker run -d \
  -v ~/DockerVolumes/opengrok/src:/opengrok/src \
  -p 8080:8080 \
  -e TZ=Asia/Shanghai \
  --name opengrok \
  opengrok/docker:latest
```

## zookeeper [<Badge type="tip" text="tags" vertical="middle" />](https://hub.docker.com/r/bitnami/zookeeper)

```shell
id=$(docker ps -aqf 'name=zookeeper$');[ $id ] && docker rm $id
docker run -d --name zookeeper \
  -p 2181:2181 \
  -e ALLOW_ANONYMOUS_LOGIN=yes \
  bitnami/zookeeper:latest
```

## kafka [<Badge type="tip" text="tags" vertical="middle" />](https://hub.docker.com/r/bitnami/kafka)

```shell
id=$(docker ps -aqf 'name=kafka$');[ $id ] && docker stop "$id" && docker rm "$id"
docker run -d --name kafka \
    -e KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true \
    -e KAFKA_CFG_NODE_ID=0 \
    -e KAFKA_CFG_PROCESS_ROLES=controller,broker \
    -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@127.0.0.1:9093 \
    -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094 \
    -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,EXTERNAL://localhost:9094 \
    -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT \
    -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
    -p 9094:9094 \
    -v ~/DockerVolumes/kafka:/bitnami/kafka \
    bitnami/kafka:latest
```

## Kafka-ui [<Badge type="tip" text="tags" vertical="middle" />](https://github.com/provectus/kafka-ui)

```bash
id=$(docker ps -aqf 'name=kafka-ui$');[ $id ] && docker rm $id
docker run -dit \
    --name kafka-ui \
    -p 8080:8080 \
    -e DYNAMIC_CONFIG_ENABLED=true \
    -v ~/DockerVolumes/kafkaui:/etc/kafkaui \
    provectuslabs/kafka-ui
```

## MeiliSearch

```bash
id=$(docker ps -aqf 'name=meilisearch$');[ $id ] && docker rm $id
docker run -itd \
    --name meilisearch \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -v ~/DockerVolumes/meili_data:/meili_data \
    getmeili/meilisearch:v1.5
```

## PostgreSQL

::: tip
当设置了 POSTGRES_USER 变量时，会以指定的用户名为超级管理员，同时会创建同名数据库，若不指定则默认用户为 postgres
:::

```bash
id=$(docker ps -aqf 'name=postgresql$');[ $id ] && docker rm $id
docker run -itd \
    --name postgresql \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=123123 \
    -p 5432:5432 \
    -v ~/DockerVolumes/postgresql/data:/var/lib/postgresql/data \
    -d postgres:alpine
```
