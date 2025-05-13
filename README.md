# UniSphere – University Ops & Analytics Platform

A comprehensive SaaS solution for managing university operations, analytics, and compliance.

## Features

### Security & Compliance
- **Real-time Security Monitoring**
  - Live security alerts with severity levels (critical, high, medium, low)
  - Status tracking (active, investigating, resolved)
  - Detailed alert information and timestamps
  - Filtering capabilities by severity

- **Compliance Management**
  - GDPR Compliance Controls
    - Data retention period configuration
    - Data processing agreement requirements
    - Privacy settings management
  - FERPA Compliance Controls
    - Directory information opt-out settings
    - Educational records access management
    - Student privacy controls

- **Security Simulation**
  - Real-time security event simulation
  - Adjustable simulation speeds
  - Non-intrusive testing environment
  - Realistic security scenarios

### Course Management
- Course creation and management
- Class scheduling
- Student enrollment tracking
- Faculty assignment

### Analytics
- Student performance tracking
- Course analytics
- Enrollment trends
- Faculty performance metrics

## Tech Stack

- **Frontend**
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - React Icons

- **State Management**
  - React Hooks
  - Context API

- **Styling**
  - Tailwind CSS
  - Custom components
  - Responsive design

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unisphere.git
   ```

2. Install dependencies:
   ```bash
   cd unisphere
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
unisphere/
├── app/
│   ├── components/
│   │   ├── Security/
│   │   │   ├── SecurityMonitoring.tsx
│   │   │   ├── ComplianceSettings.tsx
│   │   │   └── SimulationControls.tsx
│   │   └── ...
│   ├── services/
│   │   └── simulationService.ts
│   ├── types/
│   │   └── security.ts
│   └── ...
└── ...
```

## Security Features

### Security Monitoring
The platform includes a comprehensive security monitoring system that:
- Displays real-time security alerts
- Categorizes alerts by severity
- Tracks alert status
- Provides detailed alert information
- Supports filtering and sorting

### Compliance Management
The compliance management system supports:
- GDPR compliance requirements
- FERPA compliance requirements
- Data retention policies
- Privacy controls
- Access management

### Simulation Mode
The security simulation system allows:
- Testing security features without real risks
- Adjustable simulation speeds
- Realistic security scenarios
- Non-intrusive testing environment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- React team for the UI library
- Tailwind CSS team for the styling framework
