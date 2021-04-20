## Kind Notes app

This application has been developed with the help of Javascript, Jquery and Sass. in which we can add, delete and search for our notes. 

The requested layout has been developed to match the referenced image and includes:
- The user is able make multiple note-sheets that maintain their own data.
- There can be 0 to many note-sheets.
- Responsive components developed with Sass and BEM conventions.
- The application will also prevent HTML and script injections via input field.
- Notes Maintain their state after refresh.
- Notes are draggable.
- Notes background color can be changed.
- Plain JS has been used to showcase my JS skills.
- Jquery has been used for certain UI actions.
- Webpack has been used on this project with the task of starting a local server that watches the HTML, JS or SASS (CSS) files for any changes and rebuilds locally on save.

### Future Updates. TODO:

- Ability to sort search results by alphabetical and other orders
- Edit note
- Resize note
- Allow user to have font selection.


### Directions:

1- Before you can run the application, you need to install dependencies. Please access the folder where the project is located in your machine with the "cd " command and type:

* `npm install`

2- To run the development server and develop locally

* `npm run serve`

3- To build the distribution assets

* `npm run build`


##### Additional Notes:

The development server by default is http://localhost:9000/ - This can be changed in the webpack.config.js