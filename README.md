# 📋 Todo App

A modern, feature-rich todo application built with React 19, TypeScript, and Tailwind CSS. This project demonstrates modern React patterns, state management, and best practices in frontend development.

![Todo App Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🚀 **Modern Stack**: React 19 with latest features and React Compiler optimizations
- 🔷 **Type Safety**: Full TypeScript implementation with strict type checking
- 🎨 **Beautiful UI**: Responsive design with Tailwind CSS v4
- 💾 **Data Persistence**: Automatic localStorage integration
- 🏗️ **Clean Architecture**: Context + Provider pattern for state management
- ⚡ **Performance**: Optimized with Vite and Rolldown bundler
- 📱 **Mobile First**: Fully responsive across all devices
- ♿ **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

| Technology       | Purpose      | Version |
| ---------------- | ------------ | ------- |
| **React**        | UI Framework | 19.1.1  |
| **TypeScript**   | Type Safety  | 5.9.3   |
| **Vite**         | Build Tool   | 7.1.14  |
| **Tailwind CSS** | Styling      | 4.1.14  |
| **ESLint**       | Code Quality | 9.36.0  |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern browser with ES2022 support

### Installation

```bash
# Clone the repository
git clone https://github.com/JoshMany/todo-app-react.git

# Navigate to project directory
cd todo-app-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddItemButton.tsx
│   ├── addItemForm.tsx
│   └── listItem.tsx
├── contexts/           # React Context providers
│   └── TodoContext.ts
├── hooks/              # Custom React hooks
│   ├── useTodoList.tsx
│   └── useTodos.tsx
├── types/              # TypeScript type definitions
│   ├── list.ts
│   └── todo.ts
├── assets/             # Static assets and icons
└── App.tsx             # Main application component
```

## 🎯 Core Features

### ✅ Todo Management

- Create new todos with title and description
- Mark todos as complete/incomplete
- Delete todos with confirmation
- Real-time updates across all components

### 💾 Data Persistence

- Automatic localStorage synchronization
- Data survives browser refreshes
- Error handling for storage operations

### 🎨 User Interface

- Clean, modern design with Tailwind CSS
- Smooth animations and transitions
- Loading states and error feedback
- Responsive design for all screen sizes

### 🏗️ Architecture

- **Context API** for global state management
- **Custom Hooks** for reusable business logic
- **TypeScript interfaces** for type safety
- **Component composition** for maintainability

## 🧰 Development Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS v4 with a custom configuration. You can modify styles in:

- `src/index.css` - Global styles
- Component files - Component-specific styles

### State Management

The app uses React Context for state management. Key files:

- `src/contexts/TodoContext.ts` - Context definition
- `src/hooks/useTodos.tsx` - Context consumer hook
- `src/hooks/useTodoList.tsx` - Core business logic

## 🌟 Highlights

This project showcases several modern React patterns and best practices:

- **React 19 Features**: Latest React capabilities with compiler optimizations
- **Context + Provider Pattern**: Scalable state management without external libraries
- **Custom Hooks**: Reusable logic extraction and composition
- **TypeScript Integration**: Comprehensive type safety throughout the application
- **Modern Build Tools**: Vite with Rolldown for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Developer Experience**: Hot reload, ESLint, and TypeScript for productive development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for the amazing framework
- [Vite Team](https://vitejs.dev/) for the lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TypeScript Team](https://www.typescriptlang.org/) for bringing types to JavaScript

---

⭐ **Star this repo if you found it helpful!**

Built with ❤️ by [JoshMany](https://github.com/JoshMany)
