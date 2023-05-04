# PartPlanner Cloud (IaC)
## Pulumi CLI
### Install Pulumi CLI
```bash
curl -fsSL https://get.pulumi.com | sh
```
### Login to Pulumi
```bash
pulumi login
```
### Create a new project
```bash
pulumi new aws-python
```
### Create a new stack
```bash
pulumi stack init dev
```
### Set AWS region
```bash
pulumi config set aws:region us-east-1
```
