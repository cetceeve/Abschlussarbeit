# Abschlussarbeit

In this rather poorly named repository you will find a code review editor.
This code review editor is designed as a self-suffiecient component that can be added
into any code-review platform or tool. The code review editor displays code files
in an IDE like manner and allows line based commenting in each file.
A file tree for any repository can be displayed. Features for code navigation and
understanding aim at helping the reviewer conduct a meaningful code review.
A checklist provides useful advise on code review.
This code review editor currently only fully supports projects with common web technologies:
mainly javascript, HTML, CSS and markdown.

![General UI](./assets/general_ui.png)

## Prerequists

Since this code review editor is a web application any modern browser can support it.
Serverside prerequisites are an environment that can run `node.js`

## Installation

First install the necessary packages `npm install` then start the server by running `npm start`.
Navigate to your URL. For a local environment this should be `localhost:8000\app`.

## Technology

This code review editor is implemented as a web app.
Its built on `Vue.js` because of its built in reactivity, making updates and re-rendering
of the DOM automatic and hastle free. Many of the editors main features are provided
by `codemirror`. Codemirror is a highly costumizable browser based code editor. I use code folding, search, linting and code highlighting. The comment feature was originally adopted from by `side-comments`
but it has been completely rebuilt because its original implementation was not compatible
with Vue.js as the underlying framework as well as codemirror.

## Architecture

The application is split up into small Vue.js components. These are View-Controllers handling
their respective user inputs and DOM node(s). Every component is implemented as dumb display unit.
No logic or data-model related code is part of a component. The store module serves as the data-model
for the code review editor. The store holds an object called `state` which is a data-model representing
the websites content. The Vue components simply display the current `state`. If the `state` changes,
the DOM is immidiatily updated thanks to Vues built in reactivity.
The `state` can only be manipulated by calling setter methods in the store module. These methods
reporesent the logic-unit of the codereview editor. They run sanity checks on the input data and
assign it to the correct properties in the `state`.
At the moment the `state` is saved in the browsers local storage, this should change in the future.
The code-review editor also only runs on dummy data. The future goal is to pull repositories from
github for review.
A current weakness of the design is that it depends heavily on pulling packages and libraries
from content delivery networks which can result in long loading times when fist opening the website.