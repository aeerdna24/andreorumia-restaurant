# andreorumia-restaurant

---------------------------------------------------------------------------------------------------------------------------------------

School project, built with the MEAN stack, following the Pluralsight tutorial Building Angular and Node.js Apps with the MEAN Stack,
by Joe Eames.
Specifications:
The application will be a website for a restaurant. We will have different types of actors for it, clients, managers and waiters. 
	- A client can have a look at the current setting of the tables and their status (occupied, booked or available) and take 
	a look at the current menu. In order to book a table, one must have an account. Tables are reserved from a certain hour to
	another	hour. Reviews can be left by the customers. If the client that booked a table at a certain hour isn't there at least
	half an hour earlier than the supposed hour, the booking is lost.
	- A manager can update the current setting of the tables, which reflect the real-life setting of the tables in the restaurant.
	The manager needs to update the menu as well.
    - A waiter will be able to take the order of a client. The client can then be billed using the order taken by the waiter,
    directly from the app.
When changes are made to the reservations of the tables, pop-ups will be used to inform all the users. We will also display the
total number of users that are currently watching the tables' layout. When a table is clicked, the user can see the intervals for
when the table is available.
Used technologies"
 - The MEAN stack: MongoDB, Express, Angular and Node.js
 - For the html templates: Jade
 - For the CSS: Stylus, Materialize

---------------------------------------------------------------------------------------------------------------------------------------

Currently, the project is but a skeleton, with all the involved parts working. 
