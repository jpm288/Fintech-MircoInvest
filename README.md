# MicroInvest - Micro-Investing App

## Overview
MicroInvest is a modern fintech application designed for Gen Z and Millennials that automatically invests spare change from everyday purchases into popular ETFs and cryptocurrencies. The app provides a simple, engaging interface for users to grow their wealth effortlessly.

## Key Features

### 1. Onboarding / Account Setup
- Step-by-step account creation process
- Bank account or card linking (mock implementation)
- Quick tutorial on round-ups and investing
- Investment preference configuration

### 2. Dashboard / Home Screen
- Total balance display with growth percentage
- Investment statistics (round-ups this month, total invested, active investments)
- Portfolio allocation visualization
- Recent round-ups transaction list
- Invest Now and Withdraw buttons

### 3. Transactions / Round-Up Details
- Complete transaction history with round-up amounts
- Ability to skip or adjust round-ups for individual transactions
- Transaction filtering by date, category, and amount
- Round-up settings management

### 4. Portfolio Allocation
- Detailed breakdown of ETFs and crypto investments
- Visual portfolio allocation chart
- Performance comparison against benchmarks
- Ability to adjust investment allocation percentages
- Add funds functionality

### 5. Investment Growth / Analytics
- Interactive charts showing investment growth over time
- Performance comparison with benchmarks
- Round-ups by category visualization
- Performance summary with key metrics

### 6. Settings
- Account management (personal info, security)
- Investment preferences (risk profile, auto-deposit)
- Notification settings
- Linked accounts management
- Dark mode toggle

### 7. Profile
- User account information
- Referral program with rewards
- Account management options (update info, change password, feedback, logout)

## Technical Implementation

### Frontend Stack
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation
- Recharts for data visualization
- Lucide React for icons

### Design Principles
- Clean, modern UI designed for Gen Z/Millennials
- Responsive design that works on all device sizes
- Dark mode support with system preference detection
- Intuitive navigation with bottom tab bar
- Consistent design language throughout the app

### Data Management
- Mock data implementation for all financial information
- Local storage for user preferences (theme, settings)
- Event-based communication between components
- Real-time updates across the application

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open http://localhost:5173 in your browser

### Deployment
The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages

## Features in Detail

### Dark Mode Support
The app fully supports both light and dark modes:
- System preference detection
- Manual toggle option
- Consistent styling across all components
- Proper contrast ratios for accessibility

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface
- Optimized for both portrait and landscape orientations

### Interactive Elements
- All buttons and controls are fully functional
- Form validation for user inputs
- Real-time feedback through toast notifications
- Smooth transitions and animations

## Business Value

### Target Market
- Gen Z and Millennials interested in investing
- Users who want to start investing with small amounts
- Tech-savvy individuals who prefer mobile-first experiences

### Revenue Model
- Management fees on invested amounts
- Premium features for advanced users
- Referral program incentives

### Competitive Advantages
- Simple, intuitive interface
- Automated investing with minimal user effort
- Educational approach to investing
- Social features for engagement

## Future Enhancements

### Technical Improvements
- Real bank account integration (Plaid API)
- Actual investment portfolio management
- Advanced analytics and reporting
- Multi-language support

### Business Features
- Social trading features
- Investment education content
- Advanced security measures (biometric auth)
- Customer support integration

## Support
For questions or issues, please contact the development team.

## License
This is a demonstration application for evaluation purposes.