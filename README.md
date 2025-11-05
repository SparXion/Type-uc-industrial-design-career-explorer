# UCID - Industrial Design Career Explorer

**Fresh Start Implementation** - Based on North Star Design Documents

## 🎯 **Project Overview**

UCID is a conversational career discovery application designed specifically for Industrial Design students at the University of Cincinnati. The app helps students identify their interests and talents to create personalized career paths in Industrial Design.

## 🚀 **Fresh Start Features**

### **UX Anchor Flow (North Star Implementation)**
1. **Video Introduction** - Full-screen video with skip functionality
2. **Ready State** - "Ready?" prompt with animated arrow button
3. **Conversational Interface** - AI-powered career discovery chat
4. **Form Collection** - Multi-step form for talents, interests, and goals
5. **Career Exploration** - Interactive career path exploration with hover effects

### **Design System**
- **North Star CSS Variables** - Complete design token system
- **White Artboard Aesthetic** - Clean, minimal design philosophy
- **Blue Primary Colors** - #007BFF interactive elements
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion integration

## 🛠️ **Technology Stack**

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with North Star design system
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)

## 📁 **Project Structure**

```
src/
├── components/           # React components
│   ├── VideoIntroduction.tsx
│   ├── ReadyState.tsx
│   ├── ConversationalInterface.tsx
│   ├── FormCollection.tsx
│   └── CareerExploration.tsx
├── styles/              # CSS design system
│   └── north-star-system.css
├── pages/               # Page components (future)
├── utils/               # Utility functions (future)
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🎨 **Design Philosophy**

**"White artboard with interactive bits"** - Clean, minimal design focused on content with strategic interactive elements that guide users through their career discovery journey.

### **Color Palette**
- **Primary**: #007BFF (Interactive elements)
- **Secondary**: #6C757D (Secondary text)
- **Success**: #28A745 (Success states)
- **Warning**: #FFC107 (Attention states)
- **Danger**: #DC3545 (Error states)

### **Typography**
- **Font Family**: Inter (Clean, readable)
- **Scale**: 12px to 36px with consistent ratios
- **Line Heights**: Tight (1.25), Normal (1.5), Relaxed (1.75)

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd ucid-app-fresh

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development Commands**
```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 **User Experience Flow**

1. **Landing** → Full-screen video introduction
2. **Ready State** → "Ready?" with arrow button
3. **Conversation** → AI chat for career discovery
4. **Collection** → Multi-step form for user data
5. **Exploration** → Interactive career path selection

## 🔧 **Customization**

### **Adding New Career Paths**
Edit `src/components/CareerExploration.tsx`:
```typescript
const careerPaths: CareerPath[] = [
  {
    id: 'new-path',
    title: 'New Career Path',
    description: 'Description here',
    skills: ['Skill 1', 'Skill 2'],
    companies: ['Company 1', 'Company 2'],
    icon: '🎯'
  }
];
```

### **Modifying Design System**
Edit `src/styles/north-star-system.css`:
```css
:root {
  --uc-primary: #YOUR_COLOR;
  --uc-text-primary: #YOUR_TEXT_COLOR;
}
```

## 📊 **Next Steps (Phase 2)**

### **Backend Integration**
- PostgreSQL database setup
- AI conversation engine
- User profile management
- Data persistence

### **Advanced Features**
- Career path recommendations
- Skill gap analysis
- Company networking
- Progress tracking

### **Deployment**
- AWS infrastructure
- Docker containerization
- CI/CD pipeline
- Security compliance

## 🎯 **North Star Alignment**

This implementation follows the exact specifications from:
- `UCID-CSS-UI-North-Star.md` - Visual design system
- `UCID-North-Star.md` - Product vision and requirements

### **Key Implementations**
- ✅ White artboard aesthetic
- ✅ Blue-based color system
- ✅ UX anchor flow (1-5)
- ✅ Interactive elements with hover effects
- ✅ Responsive design system
- ✅ Smooth transitions and animations

## 🤝 **Contributing**

1. Follow the North Star design system
2. Maintain white artboard aesthetic
3. Use CSS variables for consistency
4. Test responsive behavior
5. Ensure accessibility compliance

## 📄 **License**

MIT License - See LICENSE file for details

## 🔗 **Related Documents**

- **North Star**: `Docs/North-Star/`
- **Training Materials**: `Docs/Starter-Training/`
- **Assets**: `Assets/Images/`
- **PRD**: `Docs/PRD/`

---

*Built with ❤️ for UC Industrial Design students*


