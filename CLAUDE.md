# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application called "weaverAI". It's a minimal setup with modern development tooling and follows standard React patterns.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2 with @vitejs/plugin-react
- **Linting**: ESLint 9.33.0 with TypeScript ESLint integration
- **Type Checking**: TypeScript 5.8.3

### Project Structure
- `src/main.tsx` - Application entry point with React StrictMode
- `src/App.tsx` - Main application component
- `src/App.css` & `src/index.css` - Application styles
- `public/` - Static assets
- TypeScript configuration split into:
  - `tsconfig.json` - Root config with project references
  - `tsconfig.app.json` - App-specific TypeScript config
  - `tsconfig.node.json` - Node/build tool TypeScript config

### Development Patterns
- Uses React 19 features and patterns
- Functional components with hooks (useState demonstrated in App.tsx)
- ES modules (`"type": "module"` in package.json)
- Strict TypeScript configuration

## Build & Type Checking

The build process runs TypeScript compilation first (`tsc -b`) then Vite build. Always run both `npm run lint` and `npm run build` before committing changes to ensure code quality and type safety.