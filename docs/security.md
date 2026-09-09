# Security

## Repository hygiene

- Never commit `.env` files containing secrets.
- Keep `.env.example` limited to non-secret configuration names/placeholders.
- Do not commit AWS credentials, SSH keys, tokens, or private endpoints.
- Do not expose client source code or confidential infrastructure details.

## CI/CD

Use GitHub Actions OIDC for AWS access rather than long-lived access keys. Scope the IAM role to only the resources required for image publishing and deployment.

## Client case studies

The LMS and Coupon repositories are sanitized case studies. Public documentation should use generic hostnames, public-safe diagrams, and high-level architecture descriptions.
