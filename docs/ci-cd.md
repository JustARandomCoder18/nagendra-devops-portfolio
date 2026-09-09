# CI/CD

The workflow lives in `.github/workflows/deploy.yml`.

Current stages:

```text
Push to main
    ↓
Checkout
    ↓
Node.js setup
    ↓
npm ci
    ↓
npm run build
    ↓
Docker build
```

The AWS ECR/EC2 deployment stage is intentionally disabled until the production AWS environment is configured.

## Credentials

Use GitHub OIDC with a least-privilege AWS IAM role for production AWS deployment. Do not store long-lived AWS access keys in GitHub repository secrets.
