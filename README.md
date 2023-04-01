# Kanen
Meteor-Svelte starter package

# Overview
This starter package is the outcome of work done to build an application system for both a 
software-as-a-service and for real time control (IoT if you prefer).  This package provides a 
scaffolding structure to quickly build pages and includes a variety of components to add page 
specific functionality.  This package is a partial port from a Meteor-Vue application in an 
attempt to reduce the bundle size and improve Time To First Byte (TTFB).  This is also a major update 
from a previous version.

This Meteor-Svelte Starter Package is built on the most current technologies as of March 2023 using 
the latest releases of Meteor, MongoDb, Svelte and 
[Goldilocks-CSS](https://zaphodbb-pm.github.io/goldilocks-css/pages/home.html). It is also an 
opinionated view of the work that needs to get done.  This package is clearly not for everyone nor 
does it try to accommodate the latest new ideas.  This package is meant for business people / product 
managers that need to get outcomes quickly and can scale during the initial growth phase of a company.

We hope you find this package useful to jump start your exploration of Svelte running on Meteor.

# Demo Site
The demo site is located at [Galaxy/Atlas](https://kanen.meteorapp.com/home) data centre.  
Sign-in with email: ‘test-user@example.com'  password:  ‘test-user-kanen’.

# Main Features
This application is a Meteor distribution built with a minimal number of Atmosphere packages and 
npm distributions.  The key major frameworks are Meteor, Svelte and Goldilocks-CSS.  
The application has also been structured to provide a fast load time.

It has been structured to create the smallest bundle and uses svelte, svelte-loadable, 
svelte-pathfinder for the client side front end.  All icons are svg from 
[Line-awesome](https://icons8.com/line-awesome) and formatted as background images.  These icons are 
packaged in Goldilocks-CSS as background icons.  This allows for a reduced combined CSS and icon 
file size.  CSS file caching improves the TTFB.

### Key features:
- Uses Meteor methods for database read / store for greater speed.
- Leverages MongoDb Change Streams for real time tracking.
- Each page is self-contained. Can be removed or added by editing route table.
- Leverages Svelte-loadable to minimize initial app load.
- Uses Svelte stores for state management.
- All text is abstracted on a per page basis to allow for internationalization and easy maintenance.
- Includes a variety of widgets / components for content display or dashboard indicators.
- Includes a mini-wiki to provide user learning resources.
- Built-in form builder with 16 configurable field types. Supports tabbed sections and horizontal grouped fields.
- Built-in document lister with filter plugins and compound search. Supports table or grid layouts.
- Supports built-in user roles and groups for access control.
- Includes System Config file for dynamic application control and debug reporting.
- Logs system activity.
- Also uses Google Analytics for improving user actions.
