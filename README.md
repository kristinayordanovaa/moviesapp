# Movies App

A modern React application that allows users to search and browse movies using the OMDB API. The app displays movies in alphabetical order with their posters, titles, and release years.

![Movies App Screenshot](./screenshots/screenshot.png)

## Features

- 🔍 **Search Functionality**: Search through thousands of movies by title
- 📋 **Alphabetical Sorting**: Movies are automatically sorted alphabetically
- 🎬 **Movie Cards**: Display movie posters, titles, years, and types
- 🚀 **Fast Loading**: Fetches up to 20 movies from multiple pages
- 📱 **Responsive Design**: Built with Tailwind CSS for a great experience on all devices

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling
- **OMDB API** - Movie data provider


## Project Structure

```
moviesapp/
├── src/
│   ├── components/
│   │   ├── Search.jsx       # Search input component
│   │   └── MovieCard.jsx    # Movie card display component
│   ├── assets/              # Images and static files
│   ├── App.jsx              # Main application component
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables (not tracked by git)
├── package.json
└── README.md
```


## API Information

This app uses the [OMDB API](http://www.omdbapi.com/) to fetch movie data. The API provides information about movies including titles, posters, release years, and more.

