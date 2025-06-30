# SplitPay 💰

**Smart bill splitting made simple**

A modern web application for fairly splitting restaurant bills and group expenses. Built with Next.js and deployed on AWS.

## 🌐 Live Demo

**Website:** http://splitpay-app.s3-website.ap-south-1.amazonaws.com/

## ✨ Features

- 🍽️ **Two Splitting Methods**: Even split or contribution-based
- 📝 **Individual Item Tracking**: Track what each person ordered
- 🤝 **Shared Items Support**: Handle shared appetizers and desserts
- 💸 **Smart Tax Handling**: Tax always split fairly
- 🎨 **Modern UI**: Dark theme with responsive design
- 📱 **Mobile Friendly**: Works perfectly on all devices

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** AWS S3 Static Website
- **Deployment:** Manual upload / GitHub Actions

## 🛠️ Local Development

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/splitpay.git
cd splitpay

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## 🌟 How to Use

1. Enter total bill amount and tax charges in ₹
2. Specify number of people
3. Choose splitting method (Even or By Contribution)
4. For contribution-based: Enter individual items and costs
5. Add shared items if applicable
6. Calculate and see detailed breakdown

## 🚀 Deployment

This app is deployed on AWS S3 with static website hosting.

### Manual Deployment
\`\`\`bash
npm run build
# Upload contents of 'out/' folder to S3 bucket
\`\`\`

### Automated Deployment
Push to main branch triggers automatic deployment via GitHub Actions.

## 📄 License

MIT License - feel free to use this project!
