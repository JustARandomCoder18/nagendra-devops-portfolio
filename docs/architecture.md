# Architecture

## Portfolio runtime

The intended production architecture is GitHub → GitHub Actions → Docker → Amazon ECR → AWS EC2 → Nginx → HTTPS.

The deployment diagram is stored in `architecture/portfolio-architecture.svg`.

## Design principles

- Keep the runtime simple for a small static portfolio.
- Use source control as the single source of truth.
- Build immutable application artifacts through Docker.
- Avoid Kubernetes because it would add unnecessary operational complexity for this workload.
- Keep production credentials outside the repository.

## Case-study boundaries

The LMS and Coupon projects are client case studies. Their infrastructure diagrams are sanitized and must not expose private addresses, credentials, proprietary source, or confidential configuration.
