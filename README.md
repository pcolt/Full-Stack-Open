# Full Stack Open - Part2
Experimenting with a little React app communicating with a Json Server. From the Helsinki Unversity's [Full Stack Open 2020 - Part2 'Communicating with server'](https://fullstackopen.com/en/part2) 

### Topics:
* Function Components, Events, Forms, Map, Refactoring...
* REST apis with JSON Server,
* ES6's Promises with Axios,
* React's Effect-hooks,
* Standard CSS and React's Inline styles

### See video of the app in action:
[https://www.youtube.com/watch?v=qS0AghmgKqc](https://www.youtube.com/watch?v=qS0AghmgKqc)\

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# How to run the application

### `npm run build`
A production build of the application is created inside the directory *build*. 

### `cp -r build/ ../root_directory_back-end-node`
Manually copy the production build of the frontend to the root of the backend.

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server` 
Launches the JSON Server (or run `npm start` from *part3* directory to use the Nodejs backend).\
Open [http://localhost:3001/api/notes](http://localhost:3001/api/notes) to view all the content stored by the JSON Server in the file *db.json* and use the custom routes in *routes.json*.

