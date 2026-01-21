# 🚀 Next-Gen Loyalty Management System (LMS)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0.0-blue)
![NestJS](https://img.shields.io/badge/nestjs-%5E10.0.0-red.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## 📖 Overview

Welcome to the **Loyalty Management System (LMS)**, a robust and flexible backend platform designed to power modern customer retention strategies. Built with **NestJS**, this system serves as the engine behind loyalty programs, handling everything from point calculation to complex rule evaluation.

Whether you are running a retail store, a SaaS platform, or an e-commerce giant, this LMS allows you to define *how* and *when* your users get rewarded.

## ⚙️ How It Works

For developers, the LMS acts as a centralized API for loyalty logic:

1.  **Define the Game:** Admins configure **Programs** and **Rules** via the API.
    *   *Example:* "Summer Campaign: Earn 10 points per $1 spent."
2.  **Ingest Events:** Your frontend or backend services send events to the LMS.
    *   *Payload:* `{ userId: "123", action: "purchase", amount: 50, category: "shoes" }`
3.  **Process & Reward:** The LMS Rule Engine evaluates the event against active programs. If criteria are met, points are calculated and the user's ledger is updated atomically.

## 💡 Use Cases

*   **🛍️ Retail & E-Commerce:**
    *   **Spend-Based:** "Earn 1 point for every Rupee/Dollar spent."
    *   **Category Boost:** "Double points on Electronics this weekend."
*   **📱 Mobile Apps & SaaS:**
    *   **Engagement:** "Earn 50 points for completing your profile."
    *   **Streaks:** "Login for 7 days in a row to unlock a bonus."
*   **🎉 Seasonal Campaigns:**
    *   **Time-Bound:** Special rewards valid only during Black Friday or Christmas.

## ✨ Key Features

*   **🏆 Dynamic Loyalty Programs:**
    *   Create multiple concurrent programs with start/end dates.
    *   Configure custom validity periods for points (e.g., points expire in 1 year).
*   **📈 Advanced Rule Engine:**
    *   **Transactional:** Award points based on spend amount (e.g., 10% back in points).
    *   **Behavioral:** Reward specific user actions (Sign-up, First Purchase, Referrals).
    *   **Conditional:** Apply multipliers based on product categories or user tiers.
*   **📢 Campaign Management:** Run short-term marketing campaigns alongside your evergreen loyalty programs.
*   **📑 Developer-First Documentation:** Interactive **Swagger/OpenAPI** interface to test endpoints instantly.
*   **🛡️ Secure & Scalable:**
    *   **JWT Authentication:** Secure endpoints for admins and users.
    *   **Modular Design:** Built on NestJS modules for easy extension and maintenance.
    *   **TypeORM:** Database agnostic (PostgreSQL/MySQL) with robust entity management.

## 🛠️ Tech Stack

*   **Framework:** [NestJS](https://nestjs.com/)
*   **Language:** TypeScript
*   **ORM:** TypeORM
*   **Documentation:** Swagger UI
*   **Package Manager:** NPM

## 🚀 Getting Started

Follow these instructions to get the Loyalty Management System up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [Git](https://git-scm.com/)
*   A database instance (PostgreSQL/MySQL as configured in TypeORM)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sidhardev/lms.git
    cd lms
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    *Configure your database connection strings and JWT secrets here.*

4.  **Run the application:**
    ```bash
    # Development mode
    npm run start:dev

    # Production build
    npm run build
    npm run start:prod
    ```

5.  **Access Documentation:**
    Once running, visit `http://localhost:3000/api` to view the Swagger API documentation.

## 🧪 Testing

Ensure system reliability with the integrated test suite.

```bash
npm test
```


```

## 🤝 Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.