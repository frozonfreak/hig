# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| 1.5.x | ✅ |
| < 1.5 | ❌ |

## Reporting a vulnerability

This repository contains a **design specification**, not executable application code. Security concerns here typically relate to:

- Guidance that could lead to unsafe implementations (e.g. draft storage of secrets, auth field restrictions)
- Incorrect security-related recommendations in the contract text

If you believe the HIG contains guidance that could cause security harm when followed, please report it responsibly:

1. **Preferred:** Open a GitHub issue with the `security` label (or a private security advisory via GitHub if the finding is sensitive)
2. Include the affected section/layer, a description of the risk, and a suggested correction if you have one

We aim to acknowledge reports within 7 days and publish a spec update in the next patch or minor release as appropriate.

## Out of scope

Vulnerabilities in third-party tools, frameworks, or implementations that *reference* this HIG should be reported to those projects directly.
