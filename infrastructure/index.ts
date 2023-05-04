import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const config = new pulumi.Config();
const containerPort = config.getNumber("containerPort") || 8080;
const cpu = config.getNumber("cpu") || 512;
const memory = config.getNumber("memory") || 1024;
const environment = config.get("environment") || "dev";
const projectName = config.get("projectName") || "test-backend";

const resourceNames = {
    cluster: projectName + "-cluster-" + environment,
    loadbalancer: projectName + "-lb-" + environment,
    repo: projectName + "-repo-" + environment,
    service: projectName + "-ecs-" + environment,
    container: projectName + "-container-" + environment,
    image: projectName + "-img-" + environment,
}

// An ECS cluster to deploy into
const cluster = new aws.ecs.Cluster(resourceNames.cluster, {
    name: resourceNames.cluster
});

// An ALB to serve the container endpoint to the internet
const loadbalancer = new awsx.lb.ApplicationLoadBalancer(resourceNames.loadbalancer, {
    name: resourceNames.loadbalancer,
    defaultTargetGroupPort: containerPort,
});

// An ECR repository to store our application's container image
const repo = new awsx.ecr.Repository(resourceNames.repo, {
    name: resourceNames.repo,
    forceDelete: true,
});

// Build and publish our application's container image from ../app to the ECR repository
const image = new awsx.ecr.Image(resourceNames.image, {
    repositoryUrl: repo.url,
    path: "../app",
});

// Deploy an ECS Service on Fargate to host the application container
const service = new awsx.ecs.FargateService(resourceNames.service, {
    name: resourceNames.service,
    cluster: cluster.arn,
    assignPublicIp: true,
    taskDefinitionArgs: {
        container: {
            name: resourceNames.container,
            image: image.imageUri,
            cpu: cpu,
            memory: memory,
            essential: true,
            portMappings: [{
                containerPort: containerPort,
                targetGroup: loadbalancer.defaultTargetGroup
            }],
        },
    },
});

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`;
