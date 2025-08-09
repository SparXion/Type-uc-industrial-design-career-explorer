# Industrial Design Career Explorer Interface - Flowchart

```mermaid
flowchart TD
    A[Landing Page<br/>Animated splash + Registration/Login] --> B[Interests Input<br/>Visual cards + Image upload]
    B --> C[Creative Outlets Input<br/>Visual tiles + Image upload]
    C --> D[Skills & Suggestions<br/>Input area + Career boxes]
    
    D --> E{Continue input or<br/>click career box?}
    E -->|Continue input| F[Update career boxes<br/>Fade/strengthen based on AI]
    E -->|Click career box| G[Career Exploration<br/>Mind map/Grid with content]
    
    F --> D
    
    G --> H{Select content box or<br/>Practice Project?}
    H -->|Select content box| I[Sub-Exploration<br/>2-3 layers deep]
    H -->|Practice Project| J[Practice Project<br/>AI-generated task]
    
    I --> K{Select sub-box or back?}
    K -->|Select sub-box| L[Deeper layer or content]
    K -->|Back| G
    
    L --> I
    
    J --> M{Complete or back?}
    M -->|Complete| N[Wrap-Up<br/>Summary + Options]
    M -->|Back| G
    
    N --> O{Save profile or<br/>connect with industry?}
    O -->|Save| P[End Session]
    O -->|Connect| Q[External links<br/>UC alumni, etc.]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style G fill:#fce4ec
    style I fill:#f1f8e9
    style J fill:#e0f2f1
    style N fill:#fafafa
    
    classDef decision fill:#ffeb3b,stroke:#f57f17,stroke-width:2px
    class E,H,K,M,O decision
```

## Legend

- **Blue nodes**: Entry points and main screens
- **Colored nodes**: Different functional areas
- **Yellow diamonds**: Decision points where users make choices
- **Arrows**: User flow and navigation paths

## Key Features

- **Smooth transitions** between all screens with animations
- **AI-powered suggestions** that update based on user input
- **A/B testing** for Career Exploration (mind map vs. grid)
- **Feedback loops** with sliders to refine AI outputs
- **Mobile-responsive** design throughout
- **MongoDB Atlas** integration for content storage
- **Google Analytics** tracking for engagement metrics

## Animation Notes

- Landing Page: Smooth fade-in for assets
- Interest Cards: Zoom in on hover
- Creative Tiles: Glow when selected
- Career Boxes: Adjust opacity based on AI confidence, hover scales
- Screen Transitions: Left-to-right slides, fades for conversational feel
