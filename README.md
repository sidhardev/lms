# Loyalty Management System (LMS)

## Overview

The Loyalty Management System is a comprehensive backend API built with NestJS that enables businesses to create, manage, and execute customer loyalty programs, promotional campaigns, and discount strategies. The system is designed to help businesses reward customer engagement, boost sales through targeted campaigns, and segment customers based on various criteria.

---

## 🎯 Key Features & Use Cases

### 1. **User Management & Authentication**

#### Features:
- **User Registration (Sign Up)**
  - OTP-based email verification for secure registration
  - Password encryption using cryptographic hashing
  - User profile creation with first name, last name, and email
  
- **User Sign In**
  - Secure email and password authentication
  - JWT token generation for session management
  - Role-based access (USER or ADMIN)

- **Password Recovery**
  - Forgot password functionality with email verification
  - Temporary reset tokens with expiration
  - Password reset via secure token validation

- **OTP Verification**
  - One-time password (OTP) generation and sending
  - Time-limited OTP validation (5 minutes)
  - Email-based verification

#### Use Cases:
- New users can securely register and verify their email
- Existing users can sign in and access loyalty programs
- Users can recover their accounts if they forget their passwords
- Email verification adds an extra security layer to prevent unauthorized account creation

---

### 2. **Campaign Management**

The system supports three main types of campaigns:

#### **A. Discount Coupon Campaigns**

**Purpose:** Provide discounts on customer orders using coupon codes or automatic rules

**Sub-types:**
1. **Order Discounts** - Apply discounts to entire orders based on specific rules
2. **Free Shipping** - Offer free shipping for qualifying orders

**Discount Rules Available:**
- **Whole Cart Discount** - Apply discount to the entire cart value
- **Bulk Purchase Discount** - Offer discounts when customers buy a minimum quantity
- **Category-Based Discount** - Discount specific product categories
- **Product Discount** - Discount specific products
- **Brand Discount** - Discount specific brands
- **Custom Cart Total** - Apply discount based on custom cart total thresholds

**Configuration Options:**
- **Discount Type:** Percentage-based or Fixed Amount
- **Maximum Uses:** Limited or unlimited redemptions
- **Redemption Type:** Apply instantly or on next order
- **User Eligibility:** 
  - New users only
  - Existing/old users
  - Limited user groups
  - Specific customer segments
- **Validity Settings:**
  - One-time or recurring use
  - Specific days of week (Monday-Sunday)
  - Time windows (start time and end time)
- **Geographic Restrictions:** Target by country, state, or city
- **Notifications:** Send campaign notifications via multiple channels

**Status Management:** Draft → Active → Paused → Expired

#### Use Cases:
- Run Black Friday/Cyber Monday sales with percentage-off coupons
- Encourage bulk purchases with tiered discounts ("Buy 5+ items, get 20% off")
- Offer free shipping on orders above a certain amount
- Target specific customer segments with personalized discounts
- Test campaigns in draft mode before activation
- Pause campaigns during holidays or when stock is low
- Restrict discounts to specific regions or only new customers

---

#### **B. Loyalty Programs**

**Purpose:** Reward customer loyalty through points accumulation and redemption

**Accumulation Rules (How customers earn points):**

1. **Points Per Rupee**
   - Customers earn fixed points for every rupee spent
   - Configurable point rate (e.g., 1 rupee = 10 points)

2. **First Purchase Bonus**
   - Award bonus points on customer's first purchase
   - Encourages initial transaction
   - Can be fixed amount or percentage-based

3. **Daily Login Streak**
   - Customers earn points for consecutive daily logins
   - Encourages app/platform engagement
   - Bonus multiplier for longer streaks

4. **Category-Based Points**
   - Different point values for different product categories
   - E.g., electronics might give 15 points per rupee, while groceries give 5 points
   - Encourages purchase of higher-margin categories

**Validity Configuration:**
- Valid specific days of the week
- Operating hours (start time and end time)
- Campaign start and end dates
- Notifications about program status and changes

#### Use Cases:
- Create a tiered loyalty program where customers earn more points for purchases in premium categories
- Encourage daily app engagement through login-streak rewards
- Offer first-purchase bonus points to new customers
- Set different earning rates for different product categories to boost sales of specific items
- Maintain customer engagement through daily login incentives

---

#### **C. Promotions**

**Purpose:** Time-limited promotional offers targeted to specific customer segments

**Features:**
- **Campaign Duration:** Define start and end dates
- **Target Segments:** Apply to specific customer segments
- **Discount Options:**
  - Percentage discount (0-100%)
  - Fixed amount discount
  - Maximum discount cap
- **Notifications:** Send notification alerts when promotions start/end or have status changes
- **Segment-Specific Targeting:** Different promotions for different customer groups

#### Use Cases:
- VIP customers get exclusive promotions before general public
- Different promotions for high-value vs. budget-conscious customers
- Seasonal promotions targeting specific customer segments
- Flash sales with limited-time high discounts to specific segments

---

### 3. **Customer Segmentation**

**Purpose:** Group customers based on specific criteria for targeted marketing

#### **User Segments**

Segments based on customer behavior and characteristics:

**Membership Criteria:**
- Registration date ranges
- Membership tier/level
- Total lifetime value
- Account status

**Engagement Criteria:**
- Purchase frequency
- Last purchase date
- Email open rates
- Click-through rates
- App usage metrics

**Discount Criteria:**
- Average discount per transaction
- Total discounts used
- Coupon redemption frequency

**Transaction Criteria:**
- Average order value
- Total orders placed
- Average transaction frequency
- Cart abandonment rate
- Return frequency

#### **Product Segments**

Segments based on inventory and product characteristics:

**Stock Level Categories:**
- High stock items
- Low stock items (for promotional clearance)
- Out of stock items

**Purchase Frequency by Product:**
- Best sellers
- Slow-moving products
- Seasonal items

**Price-Based Categories:**
- Budget products
- Mid-range products
- Premium products

**Product Interaction:**
- Most viewed products
- Most wishlisted products
- High conversion items

#### Use Cases:
- Identify high-value customers and offer them exclusive loyalty programs
- Target customers who haven't purchased in 90 days with win-back discounts
- Segment by average order value to apply appropriate discounts
- Identify at-risk customers (declining purchase frequency) for retention campaigns
- Create promotions for slow-moving inventory
- Target budget-conscious customers with deals on affordable items
- Encourage repeat purchases from occasional buyers with tiered discounts

---

### 4. **Notification System**

**Purpose:** Send campaign and promotion updates through multiple channels

**Supported Channels:**
- Email
- SMS
- Push notifications
- In-app notifications

**Notification Components:**
- Custom title
- Custom body/message
- Banner images
- Call-to-action (CTA) button text and link

**Associated With:**
- Discount campaigns
- Loyalty programs
- Promotions
- General campaign communications

#### Use Cases:
- Alert customers when a new promotion is available
- Send push notifications about loyalty points expiration
- Email reminders for ongoing campaigns
- In-app notifications for real-time campaign updates
- Personalized notifications based on segment eligibility

---

### 5. **Shipping Campaign Management**

**Purpose:** Manage free shipping and other shipping-related promotions

**Features:**
- **Free Shipping Campaigns**
  - Define eligible locations (countries, states, cities)
  - Minimum order thresholds
  - Time-based validity

**Use Cases:**
- Offer free shipping for orders above $50 in specific regions
- Regional free shipping promotions during holidays
- Free shipping for specific customer segments or loyalty members
- Restrict free shipping to certain geographic areas

---

## 📋 Core API Endpoints

### Authentication & Users
- `POST /auth/signin` - User login
- `POST /auth/forget-password` - Request password reset
- `GET /auth/reset-password?token=` - Verify password reset token
- `POST /auth/reset-password` - Complete password reset
- `POST /user/send-otp` - Send OTP to email
- `POST /user/verify-otp` - Verify OTP and get JWT token
- `POST /user/signup` - Create new user account (requires OTP verification)

### Campaign Management
- `POST /campaigns/discount-coupon/create` - Create discount or free shipping campaign
- `POST /campaigns/loyaltyprogram/create` - Create loyalty program
- `GET /campaigns/get?page=1&limit=10` - List all campaigns (paginated)
- `GET /campaigns/discount-coupon/active` - Get active campaigns
- `PATCH /campaigns/discount-coupon/:id/status` - Change campaign status
- `DELETE /campaigns/coupon/:id` - Delete campaign

### Promotions
- `POST /promotion` - Create new promotion
- `GET /promotion/get?page=1&limit=10` - List promotions (paginated)
- `DELETE /promotion/delete/:id` - Delete promotion

### Segments
- `POST /segment/create` - Create customer or product segment
- `GET /segment/get?page=1&limit=10` - List segments (paginated)
- `GET /segment/:id` - Get segment details
- `DELETE /segment/:id` - Delete segment

### Notifications
- `GET /notifications` - Get notification endpoints

### Shipping
- `GET /shipping-campaign` - Get shipping campaigns
- `PATCH /shipping-campaign/:id/status` - Update shipping campaign status
- `DELETE /shipping-campaign/:id` - Delete shipping campaign

---

## 🔧 Technical Stack

- **Framework:** NestJS (Node.js framework for building scalable server-side applications)
- **Database:** PostgreSQL (with TypeORM for database management)
- **Authentication:** JWT (JSON Web Tokens) with Passport.js
- **Email Service:** Nodemailer (for sending OTPs and password reset emails)
- **Validation:** class-validator and class-transformer
- **API Documentation:** Swagger/OpenAPI
- **Password Encryption:** Crypto library with scrypt hashing

---

## 🏗️ Project Architecture

### Module Structure:

```
src/
├── auth/                 # User authentication & authorization
├── user/                 # User profile management
├── mail/                 # Email and OTP services
├── campaigns/            # Campaign management
│   ├── order-campaign/   # Discount coupon campaigns
│   ├── loyalty-program/  # Loyalty program management
│   └── shipping_campaign/# Shipping promotion campaigns
├── promotion/            # General promotions
├── segment/              # Customer & product segmentation
└── notifications/        # Notification management
```

---

## 💡 Business Use Cases

### 1. **E-Commerce Platform**
- Create discount campaigns to drive sales during peak seasons
- Build customer loyalty programs to increase repeat purchases
- Segment customers by purchase history to send targeted promotions
- Offer free shipping to incentivize higher order values

### 2. **Retail Business**
- Category-specific discounts to promote specific products
- VIP loyalty program with higher point redemption rates
- Segment-based flash sales for different customer types
- Regional promotions with geographic restrictions

### 3. **Subscription Service**
- First-purchase bonus points to encourage sign-ups
- Daily login streak rewards to increase platform engagement
- Tier-based promotions for different subscription levels
- Win-back campaigns for inactive subscribers

### 4. **Marketplace**
- Seller-specific discount campaigns
- Seasonal promotions tied to festivals or holidays
- Customer segments based on product category preferences
- Multi-segment promotions reaching different buyer personas

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Environment Setup
Create a `.env` file with:
```
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=lms_database
JWT_SECRET=your_secret_key
MAIL_HOST=your_mail_host
MAIL_PORT=587
MAIL_USER=your_email@domain.com
MAIL_PASS=your_email_password
PORT=3000
```

### Installation & Running
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm build

# Start production server
npm start:prod
```

### API Documentation
Once the server is running, access the Swagger API documentation at:
```
http://localhost:3000/api
```

---

## 📊 Data Models

### User
- ID, First Name, Last Name, Email, Password, Role, Reset Token (for password recovery)

### Campaign
- Campaign ID, Name, Description, Type (Loyalty/Discount/Free Shipping), Status, Start Date, End Date

### Discount Campaign
- Campaign ID, Discount Type, Discount Amount/Percentage, Max Discount, Max Uses, Redemption Type, User Eligibility, Geographic Restrictions

### Loyalty Program
- Campaign ID, Valid Days, Validity Hours, Accumulation Rules, Point Values

### Promotion
- Promotion ID, Name, Date Range, Target Segments, Discount Details, Notifications

### Segment
- Segment ID, Name, Description, Type (User/Product), Criteria (Members/Engagement/Discount/Transaction)

### Notification
- Notification ID, Channel (Email/SMS/Push), Title, Body, CTA Details, Associated Campaign

---

## 🔐 Security Features

- **Password Encryption:** Passwords are hashed using scrypt algorithm
- **JWT Authentication:** Secure token-based authentication
- **OTP Verification:** Time-limited OTP for email verification
- **Email Validation:** All email inputs are validated
- **Role-Based Access:** Different access levels for USER and ADMIN roles
- **Token Expiration:** JWT tokens expire after 1 day

---

## 📝 Notes

- All dates are stored in timestamp format (ISO 8601)
- Pagination is supported on list endpoints (page and limit parameters)
- Empty/null values are handled gracefully across all endpoints
- Notifications can be sent through multiple channels for the same campaign
- Discount campaigns can be restricted by geography (country, state, city)
- Loyalty points are configurable per campaign/rule
- Customer segments are created based on defined criteria and can include multiple conditions

---

## 🤝 Integration Points

This LMS system is designed to integrate with:
- **Payment Gateway:** For tracking transactions and applying discounts
- **Email Service:** For sending OTPs and campaign notifications
- **E-commerce Platform:** For accessing user, product, and order data
- **Push Notification Service:** For sending mobile notifications
- **SMS Service:** For sending promotional messages
- **Analytics Platform:** For tracking campaign performance and ROI

---

## 📚 Key Concepts for Non-Technical Users

- **Campaign:** A marketing initiative with specific rules and rewards
- **Loyalty Program:** A rewards system where customers earn points and redeem them
- **Segment:** A group of customers with similar characteristics or behaviors
- **Promotion:** A limited-time offer targeting specific customer groups
- **Discount:** A price reduction offered to customers
- **Coupon:** A code that customers use to apply a discount
- **Free Shipping:** Offering to deliver products without additional shipping charges
- **Notification:** A message sent to customers about campaigns or updates
- **JWT Token:** A secure pass that proves a user is authenticated
- **OTP:** A temporary security code sent to verify someone's email

---

**Version:** 1.0  
**Last Updated:** January 21, 2026
