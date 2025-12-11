# ** HelpstudyAssignment

A modern admin dashboard built using Next.js, Material UI, TailwindCSS, and Zustand for state management.The project fetches live data from DummyJSON API and provides full features like authentication, user list, product list, search, pagination, product details, and user details.

# ** Features

# * Authentication

 - Simple login screen
 - Auth state managed via Zustand
 - Logout functionality with global reset

 # * Users Module

 - Fetch all users
 - Search users
 - Pagination

# * Products Module

  - Fetch all products
  - View product details
  - Category filter (limited API support)

  # * UI/UX

   - Beautiful combination of Material UI + TailwindCSS
   - Responsive design
   - Skeleton & Loading states
   - Clean navigation with Navbar

  # ** Folder Structure

 /src
 ├── components/         # Navbar, UI components
 ├── pages/              # All route pages
 │    ├── login/
 │    ├── users/
 │    ├── products/
 ├── store/              # Zustand stores
 ├── styles/             # Tailwind & globals
 └── utils/              # API functions


   # ** Tech Stack

   - Next.js -	Frontend Framework
   - Material UI -	Components & UI
   - TailwindCSS -	Utility styling
   - Zustand -	Global state management
   - DummyJSON API -	Backend data
   - Axios / Fetch -	API calling

  # ** API Sources (DummyJSON)

   - This project uses:

   - https://dummyjson.com/users
   - https://dummyjson.com/products
   - https://dummyjson.com/products/:id
   - https://dummyjson.com/users/:id