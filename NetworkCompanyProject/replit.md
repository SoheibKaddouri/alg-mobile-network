# ALG Mobile Network

## Overview

ALG Mobile Network is a web-based mobile service provider platform that allows users to browse, compare, and select mobile network plans. The application features a multi-page website with service discovery, plan selection, and shopping cart functionality. Users can explore different mobile network providers (Fone, Gap, and Flipper), view various service plans, and add them to their basket for checkout.

The project is built as a client-side web application using vanilla HTML, CSS, and JavaScript with no backend server or database integration at this time.

## Recent Changes (October 31, 2025)

### Bug Fixes
- **Critical localStorage Error Handling**: Created `storage-helper.js` utility to safely handle localStorage operations with automatic fallback to in-memory storage when localStorage is blocked or unavailable, preventing application crashes in private browsing mode
- **DOM Element Safety**: Added comprehensive null checks in `fgf.js` and `script.js` to prevent "Cannot read property of null" errors when DOM elements are missing or HTML structure changes
- **DOMContentLoaded Wrapper**: Wrapped all JavaScript initialization in DOMContentLoaded event listeners to ensure elements exist before manipulation

### Performance Enhancements
- **DOM Query Caching**: Implemented card element caching in `fgf.js` to eliminate redundant `querySelectorAll` calls during basket updates, reducing DOM traversal overhead
- **Reduced Duplicate Code**: Created `shared.css` to consolidate header, navigation, and search bar styles shared across all pages, eliminating ~90 lines of duplicate CSS
- **Optimized State Management**: Refactored cart operations to maintain basket state in memory and batch localStorage updates, reducing JSON parse/stringify operations
- **Improved Code Organization**: Updated all HTML files to load shared styles first, improving CSS cascade efficiency and reducing style recalculation

### Code Quality Improvements
- **Error Logging**: Added console warnings for missing DOM elements to aid debugging
- **Code Documentation**: Improved inline comments explaining storage strategy and error handling
- **Consistent File Loading**: Standardized script loading order across all service pages (storage-helper.js → fgf.js)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML5 for structure
- Vanilla CSS3 for styling (with Google Fonts integration for Poppins font family)
- Vanilla JavaScript (ES6+) for interactivity
- External icon libraries (Boxicons and Font Awesome) for UI elements

**Design Pattern:**
The application follows a multi-page architecture where each HTML page represents a distinct section of the user journey. Pages are statically linked together through navigation elements.

**Page Structure:**
- `index.html` - Landing page with login/registration forms (authentication flow is client-side only)
- `about.html` - Company information and team presentation
- `services.html` - Service provider selection hub
- `fone.html`, `gap.html`, `flipper.html` - Individual provider plan pages with shopping functionality

**Styling Strategy:**
The application uses a modular CSS approach:
- `shared.css` - Common styles shared across all pages (header, navbar, base elements)
- Page-specific CSS files (`index.css`, `services.css`, `about.css`, `fgf.css`) for unique page styling
- Consistent design language with dark theme and optical fiber background imagery

**Rationale:** Multi-page architecture was chosen for simplicity and ease of navigation. Each page serves a clear purpose, making the codebase easier to maintain and understand. This approach avoids the complexity of single-page application frameworks while providing straightforward user flows.

### State Management

**Shopping Cart Implementation:**
The application uses a hybrid storage approach through `storage-helper.js`:
- Primary: Browser localStorage for persistent cart data
- Fallback: In-memory JavaScript object when localStorage is unavailable
- Cart state is serialized as JSON and stored under specific keys

**Rationale:** This dual-storage strategy ensures cart functionality works even in restrictive browser environments (private browsing, disabled storage) while providing persistence when available. The helper module abstracts storage concerns from business logic.

**Cart Operations:**
Cart management is handled through `fgf.js`, which:
- Maintains cart state across page loads
- Updates UI elements (quantity indicators) based on cart contents
- Provides add/remove/clear operations
- Caches DOM queries for performance optimization

### Navigation and User Flow

**Authentication Flow:**
Login/registration forms are present but authentication is entirely client-side. Form submission on `index.html` redirects to `services.html` without server validation.

**Rationale:** The current implementation prioritizes UI/UX demonstration over security. This approach is acceptable for prototyping but would need backend integration for production use.

**Service Selection Flow:**
1. User lands on home page (index.html)
2. User navigates to services page
3. User selects a provider (Fone, Gap, or Flipper)
4. User views plans and adds to cart
5. User reviews cart in slide-out basket menu
6. User proceeds to checkout (endpoint not implemented)

### Component Architecture

**Reusable Components:**
- Header navigation (consistent across all pages)
- Search bar (non-functional placeholder)
- Basket menu (slide-out panel for cart review)
- Service cards (plan display and selection interface)

**Event Handling:**
JavaScript files use event delegation and DOM manipulation:
- `script.js` - Handles login/registration form interactions
- `fgf.js` - Manages basket menu interactions and cart operations
- Inline click handlers for service card navigation

## External Dependencies

### Third-Party Libraries and Services

**Icon Libraries:**
- Boxicons (`unpkg.com/boxicons@2.1.4`) - General UI icons for navigation and features
- Font Awesome 6.4.2 (`cdnjs.cloudflare.com`) - Shopping basket and service category icons

**Rationale:** CDN-hosted icon libraries provide extensive icon sets without local asset management. This reduces bundle size and leverages browser caching.

**Typography:**
- Google Fonts API - Poppins font family (weights: 400, 500, 600)

**Rationale:** Web fonts ensure consistent typography across platforms and browsers, with Google Fonts providing reliable CDN delivery and performance optimization.

**Image Assets:**
- External image hosting via `img.freepik.com` for background imagery
- `canvas-generations-v1.s3.us-west-2.amazonaws.com` for team member photos
- `cdn.dribbble.com` for logo assets

**Limitations:** Reliance on external image hosts creates dependencies on third-party availability. Consider migrating to local or controlled CDN storage for production.

### Browser APIs

**LocalStorage API:**
Used for persistent cart storage with graceful degradation to in-memory storage when unavailable.

**DOM API:**
Extensive use of querySelector, event listeners, and DOM manipulation for dynamic UI updates.

### Missing Integrations

**No Backend Services:**
The application currently lacks:
- Authentication server/API
- Database for user accounts or order history
- Payment processing integration
- Plan/inventory management system

**No Build Tools:**
The project does not use:
- Module bundlers (Webpack, Vite, etc.)
- CSS preprocessors (Sass, Less)
- JavaScript transpilers (Babel)
- Package managers (npm, yarn)

**Rationale:** The vanilla approach keeps the project simple and accessible but limits scalability. Future enhancements would benefit from modern tooling and backend integration.