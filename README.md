# MS Boilerplate

**MS Boilerplate** is a [boilerplate](https://en.wikipedia.org/wiki/Microservices) to create micro-services with a basic initial structure.

**This project** uses sam to build the infrastructure on AWS that includes lambda and a gateway api using an [openapi](https://swagger.io/docs/specification/about/)

> **Table of contents**
> - [🔍 Requirements](#requirements)
> - [🔨 Project setup](#project-setup)
> - [☁️ Provisioning the infrastructure](#️provisioning-the-infrastructure)
> - [⬆️ Deploying locally](#deploying-locally)
> - [▶️ Running locally](#running-locally)
> - [💪 Dev Team](#dev-team)


## <a name="requirements"></a> 🔍 Requirements

| Dependencies                                 | Description               |
| -------------------------------------------- | ------------------------- |
| [![node-version]][node-download]             | Javascript Runtime        |
| [![sam-version]][sam-download]               | AWS SAM CLI               |
| [![docker-version]][docker-download]         | Virtualization containers |
| [![terraform-version]][terraform-download]   | Terraform                 |
| [![terragrunt-version]][terragrunt-download] | Wrapper for Terraform     |

## <a name="project-setup"></a> 🔨 Project setup

1. To **clone repository** you need to have [git](https://git-scm.com/downloads) installed:

```bash
git clone git@github.com:GrooveCommunity/ms-boilerplate.git
```

2. Enter repository

```bash
cd ms-boilerplate
```

3. To **install dependencies** you need to have [NodeJS](https://nodejs.org/en/) installed:

```bash
npm install
```

4. Copy file `env.json.example` to `env.json` and modify it accordingly

## <a name="provisioning-the-infrastructure"></a> ☁️ Provisioning the infrastructure

This steps deploy at chosen environment infrastructure and generates env to deploy this microservice of your machine.

1. Declare environments variables:

```dosini
AWS_ACCOUNT_ID=<profile name>

JWT_SECRET=<JWT secret to authorize requests>

ENV_NAME=<environment short name, like "dev" or "prd">
```

2. To run terragrunt you need [terragrunt][terragrunt-download] installed:

```bash
terragrunt apply --terragrunt-working-dir iac
```

> To learn more [Terragrunt](https://terragrunt.gruntwork.io/docs/).
 
When finished with :heavy_check_mark: sucess it will show this:

```bash
Apply complete! Resources: 5 added, 0 changed, 0 destroyed.
```

And it should have created a file called `sam-params`.

## <a name="deploying-locally"></a> ⬆️ Deploying to AWS

This step will deploy your local code to AWS.

> :warning: Atention: To run the deploy you need to have performed the above steps.

1. Build all files to single file JS peer function:

```bash
npm run build
```

2. Run the following (the S3 bucket should already exist):

```bash
sam deploy --stack-name boirleplate-$ENV_NAME --s3-bucket $AWS_ACCOUNT_ID-boilerplate-$ENV_NAME-sam-stack --parameter-overrides "$(cat sam-params)" --capabilities "CAPABILITY_NAMED_IAM" -t template.yaml
```

## <a name="running-locally"></a> ▶️ Running locally

To run this microservice and dependencies locally you need [aws sam cli][sam-download] installed.

1. Start build on watch mode with **typescript** and **./prepare.js** to install only prod dependencies at dist:

```bash
npm run start
```

2. Start api with **AWS SAM CLI**:

```bash
sam local start-api --env-vars env.json
```

> To learn more [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html).

### <a name="dev-team"></a> 💪 Dev Team

This project exists thanks to all these people.

[![Marcos](https://avatars3.githubusercontent.com/u/12430365?s=100)](https://github.com/codermarcos)[![Massa](https://avatars.githubusercontent.com/u/19602894?s=100)](https://github.com/ribaptista)

[terraform-download]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[terragrunt-download]: https://terragrunt.gruntwork.io/docs/getting-started/install/
[node-download]: https://nodejs.org/download/release/v14.14.0/
[docker-download]: https://docs.docker.com/engine/install/
[sam-download]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html
[terraform-version]: https://img.shields.io/badge/terraform-latest-blue
[terragrunt-version]: https://img.shields.io/badge/terragrunt-latest-blue
[node-version]: https://img.shields.io/badge/node-latest-blue
[sam-version]: https://img.shields.io/badge/sam-1.24.1-blue
[docker-version]: https://img.shields.io/badge/docker-latest-blue
