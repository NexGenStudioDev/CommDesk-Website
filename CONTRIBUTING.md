# Contributing to CommDesk 🚀

First off, thank you for considering contributing to CommDesk! 🎉

We welcome contributions from developers of all experience levels. Whether you're fixing a bug, improving documentation, suggesting a feature, or writing code, your efforts help make this project better for everyone.

Please take a moment to read through this guide before contributing.

---

# Code of Conduct

By participating in this project, you agree to follow our Code of Conduct and help create a welcoming, respectful, and inclusive environment for everyone.

Please review the project's `CODE_OF_CONDUCT.md` before contributing.

---

# How to Report Bugs

Before opening a bug report:

* Search existing issues to ensure the bug has not already been reported.
* Verify that the issue still exists on the latest version of the project.

When creating a bug report, please include:

## Bug Report Template

### Description

Provide a clear and concise description of the issue.

### Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. Observe the error

### Expected Behavior

Describe what you expected to happen.

### Actual Behavior

Describe what actually happened.

### Environment

* Operating System:
* Browser:
* Node.js Version:
* Package Manager (npm/pnpm):
* Project Version:

### Screenshots

Attach screenshots or recordings if applicable.

---

# How to Suggest Features

We welcome feature suggestions and improvements.

Before starting development:

1. Check existing issues and discussions.
2. Open a new issue describing your idea.
3. Explain:

   * The problem you're trying to solve.
   * Your proposed solution.
   * Alternative solutions considered.
4. Wait for feedback from maintainers before beginning implementation.

This helps avoid duplicated work and ensures alignment with the project roadmap.

---

# Development Setup

## Prerequisites

Make sure you have:

* Node.js (Latest LTS recommended)
* npm or pnpm
* Git

## Clone the Repository

```bash
git clone https://github.com/NexGenStudioDev/CommDesk-Website.git
cd CommDesk-Website
```

## Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

## Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Run Development Server

```bash
npm run dev
```

or

```bash
pnpm dev
```

---

# Code Contribution Workflow

## 1. Fork the Repository

Click the **Fork** button on GitHub and clone your fork locally.

```bash
git clone https://github.com/<your-username>/CommDesk-Website.git
```

---

## 2. Create a Branch

Create a descriptive branch name.

Examples:

```bash
git checkout -b feat/navbar-enhancement
```

```bash
git checkout -b fix/mobile-layout
```

```bash
git checkout -b docs/contributing-guide
```

Branch Naming Convention:

* `feat/` → New features
* `fix/` → Bug fixes
* `docs/` → Documentation changes
* `refactor/` → Code improvements
* `test/` → Test-related changes
* `chore/` → Maintenance tasks

---

## 3. Make Changes

Implement your changes while following project coding standards.

---

## 4. Commit Changes

Use clear and meaningful commit messages.

Examples:

```bash
git commit -m "feat: add responsive sidebar navigation"
```

```bash
git commit -m "fix: resolve navbar overflow issue"
```

```bash
git commit -m "docs: add contribution guidelines"
```

---

## 5. Keep Your Branch Updated

Sync with the latest changes from the main repository.

```bash
git remote add upstream https://github.com/NexGenStudioDev/CommDesk-Website.git
```

```bash
git fetch upstream
```

```bash
git checkout main
git merge upstream/main
```

```bash
git checkout <your-branch>
git rebase main
```

---

## 6. Push Changes

```bash
git push origin <your-branch>
```

---

## 7. Submit a Pull Request

When opening a Pull Request:

* Provide a clear title.
* Describe the changes made.
* Reference related issues using:

```text
Closes #IssueNumber
```

* Include screenshots for UI changes.
* Ensure all checks pass.

---

# Coding Standards & Style

To maintain consistency across the project:

## Formatting

This project uses:

* Prettier
* ESLint

Run formatting and linting before submitting a PR.

Example:

```bash
npm run lint
```

```bash
npm run format
```

---

## General Guidelines

* Write clean, readable, and maintainable code.
* Follow TypeScript best practices.
* Prefer reusable components.
* Keep business logic separate from UI components.
* Use meaningful variable and function names.
* Avoid unnecessary code duplication.

---

## Testing

Before submitting a Pull Request:

* Ensure existing tests pass.
* Add tests for new functionality whenever applicable.

Example:

```bash
npm run test
```

---

# Pull Request Review Process

Maintainers will review submissions based on:

* Code quality
* Project consistency
* Performance considerations
* Documentation completeness
* Test coverage

Feedback may be provided before approval. Please be open to suggestions and requested changes.

---

# Licensing

By contributing to this repository, you agree that your contributions will be licensed under the same license as this project.

---

# Need Help?

If you have questions about contributing:

* Open a discussion or issue.
* Reach out to project maintainers.
* Review existing documentation.

Thank you for helping improve CommDesk! 💙

Happy Coding! 🚀
