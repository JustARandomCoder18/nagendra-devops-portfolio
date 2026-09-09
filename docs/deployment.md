# Deployment

## Local

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Docker

```bash
docker build -t nagendra-devops-portfolio .
docker run --rm -p 8080:80 nagendra-devops-portfolio
```

## Planned AWS deployment

1. Create an ECR repository.
2. Provision an EC2 instance and install Docker/Nginx.
3. Configure an IAM role for the EC2 runtime.
4. Configure GitHub Actions OIDC to an AWS IAM role.
5. Push the Docker image to ECR.
6. Pull the image on EC2 and restart the container.
7. Configure Nginx for the production hostname.
8. Configure HTTPS.
9. Verify health, logs, and rollback procedure.

Do not mark these steps as completed until the environment has actually been provisioned and tested.
