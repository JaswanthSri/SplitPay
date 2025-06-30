# SplitPay

## Smart, Effortless Bill Splitting

---

**Live Demo:** [SplitPay Calculator](http://splitpay-app.s3-website.ap-south-1.amazonaws.com/)

SplitPay is a modern web application engineered to simplify the process of splitting restaurant bills and group expenses. Developed with **React** and **Next.js**, it offers robust functionality for complex splitting scenarios, all within a clean and intuitive user interface.

---

## Features

### Flexible Splitting Methods
* **Split Evenly**: Divides the total bill, including tax, equally among all participants.
* **Split by Contribution**: Allows individuals to pay for their specific orders while sharing the tax burden equally.

### Detailed Itemization
* Users can specify the number of items ordered by each person.
* Individual costs for each item can be entered, with real-time subtotal calculations.

### Shared Expense Management
* Supports the addition of items shared among specific individuals.
* Participants in each shared item can be selected, with automatic cost distribution among them.

### Intelligent Tax Handling
* Direct input for tax charges in Indian Rupees (Rs.).
* Tax is always split equally among all participants, ensuring fairness.
* Provides a clear breakdown of individual costs versus shared tax contributions.

### Modern User Interface
* Features a **dark theme** complemented by aesthetic gradient backgrounds.
* Fully **responsive design**, optimized for mobile, tablet, and desktop viewing.
* Presents information in a clean, card-based layout.
* Incorporates smooth animations and hover effects for enhanced user experience.

---

## Technologies Used

* **Next.js 14**: React framework utilizing the App Router.
* **React 18**: UI library with comprehensive hook support.
* **TypeScript**: Ensures type safety throughout the application.
* **Tailwind CSS**: Utility-first CSS framework for streamlined styling.
* **AWS S3**: Employed for static website hosting.

---

## Usage Guide

### Basic Setup
1.  Enter the total bill amount in Rs.
2.  Input the tax charges in Rs.
3.  Specify the number of people involved.

### Selecting a Split Method
* Choose **Even Split** for straightforward, equal division.
* Select **Contribution Split** for fair, individual-based cost allocation.

### For Contribution Split
1.  Enter each person's name.
2.  Specify the quantity of items ordered by each individual.
3.  Enter the cost for each individual item.
4.  Add any shared items and designate the participants for each.
5.  Click "**Calculate Bill**" to view results.

### Understanding Results
* View a precise breakdown of what each person owes.
* Detailed summary includes individual costs versus their share of the tax.
* Clear totals for all amounts.

---

## Ideal Use Cases

SplitPay is an ideal solution for:
* Restaurant outings with friends or colleagues.
* Office lunch groups.
* Family dinners and gatherings.
* Group travel expenses and shared meals.
* Any scenario requiring equitable and transparent bill splitting.

---

## Key Advantages

* **Fair Allocation**: Eliminates instances of individuals overpaying for others' higher-cost orders.
* **Handles Complexity**: Seamlessly manages both individual and shared item contributions.
* **Indian Currency Support**: Specifically designed for Indian Rupees (Rs.) with appropriate formatting.
* **Mobile Optimized**: Enables convenient bill calculations directly at the point of service.
* **No Registration Required**: Immediate usability without the need for sign-up or account creation.

---

## Getting Started (Development)

### Prerequisites
* Node.js 18+
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/JaswanthSri/splitpay.git](https://github.com/JaswanthSri/splitpay.git)
    cd splitpay
    ```

2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
'''

## Deployment

This application is deployed on AWS S3 with static website hosting.

**Live URL:** [http://splitpay-app.s3-website.ap-south-1.amazonaws.com/](http://splitpay-app.s3-website.ap-south-1.amazonaws.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Developed using modern React patterns and Next.js best practices.
- Conceived from the practical need for fair bill splitting in group dining scenarios.
- Designed with specific consideration for Indian currency and dining culture.


