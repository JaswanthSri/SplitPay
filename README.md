# SplitPay 💰

**Smart bill splitting made simple**

🌐 **Live Demo:** [SplitPay Calculator](http://splitpay-app.s3-website.ap-south-1.amazonaws.com/)

SplitPay is a modern web application that makes splitting restaurant bills and group expenses fair and effortless. Built with React and Next.js, it handles complex splitting scenarios while maintaining a clean, intuitive interface.

## ✨ Features

### 🍽️ Two Splitting Methods
- **Split Evenly**: Divide total bill + tax equally among everyone
- **Split by Contribution**: Pay for what you ordered + equal tax share

### 📝 Individual Item Tracking
- Each person can specify number of items they ordered
- Enter individual cost for each item
- Real-time subtotal calculations

### 🤝 Shared Items Support
- Add items shared between specific people
- Select who participated in each shared item
- Automatic cost distribution among sharers

### 💸 Smart Tax Handling
- Enter tax charges directly in Rs.
- Tax always split equally (fair for everyone)
- Clear breakdown of individual vs. tax costs

### 🎨 Modern UI/UX
- Dark theme with beautiful gradient backgrounds
- Fully responsive design (mobile, tablet, desktop)
- Clean card-based layout
- Smooth animations and hover effects

## 🚀 Live Application

Visit the live application: **[SplitPay Calculator](http://splitpay-app.s3-website.ap-south-1.amazonaws.com/)**

## 🛠️ Built With

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **AWS S3** - Static website hosting

## 📱 How to Use

### Basic Setup
1. Enter total bill amount in Rs.
2. Enter tax charges in Rs.
3. Specify number of people

### Choose Split Method
- **Even Split**: For simple equal division
- **Contribution Split**: For fair individual-based splitting

### For Contribution Split
1. Enter each person's name
2. Specify number of items they ordered
3. Enter cost for each individual item
4. Add any shared items and select who shared them
5. Click "Calculate Bill"

### Results
- See exactly what each person owes
- Detailed breakdown of individual costs vs. tax share
- Clear summary with total amounts

## 🎯 Use Cases

Perfect for:
- Restaurant outings with friends
- Office lunch groups
- Family dinners
- Group trips and shared meals
- Any scenario requiring fair bill splitting

## 🌟 Key Benefits

- **Fair Splitting**: No more overpaying for others' expensive orders
- **Handles Complexity**: Manages individual items + shared items seamlessly  
- **Indian Currency**: Built specifically for Rs. with proper formatting
- **Mobile Optimized**: Calculate bills right at the restaurant table
- **No Registration**: Start using immediately, no sign-up required

## 🚀 Getting Started (Development)

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/splitpay.git
cd splitpay
\`\`\`

2. Install dependencies
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
\`\`\`bash
npm run build
\`\`\`

## 🌐 Deployment

This application is deployed on AWS S3 with static website hosting.

**Live URL:** [http://splitpay-app.s3-website.ap-south-1.amazonaws.com/](http://splitpay-app.s3-website.ap-south-1.amazonaws.com/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React patterns and Next.js best practices
- Inspired by the need for fair bill splitting in group dining
- Designed with Indian currency and dining culture in mind


