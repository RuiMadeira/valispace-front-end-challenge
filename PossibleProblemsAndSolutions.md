
# Possible problems and solutions
## Posts List
- As number of posts increases, UI will be slower because number of html elements to render, solutions:
    - In the query to get posts, limit the number of posts using pagination or an infinite scroll like fetch on demand.
    - In the component rendering the posts list, only render the visible ones plus a buffer of posts at the top and bottom (for smother scrolling). In React, react-virtualized or react-window libraries would have been my go to tools for this. In Angular, I saw Angular Material already has a CDK component to deal with this: cdk-virtual-scroll-viewport, so I would start there.
- If we want to further separate the posts module from the employees administration, we could have services for the autocomplete and the translation of mentions into values and employee info cards. These services would only use the necessary functions from the manage employee service.

## Post
- When doing selection of an employee to mention the insert in the text of @{} is not very good UX. I would rather be able to have styled divs and more a "what you see is what you get" style. For this I tried with using a div with contentEditable="yes" instead of the text area, however I was having issues rendering the selected mention as I wanted and then handling the editions around that div would probably be trickier. To properly solve this I would use a popular editor library like Quill or TinyMCE, etc.  
- I would rather have done the post preview as a tab section, but the rendering of the tab group on focus of the textarea would mess with its focus which would be bad UX. Given more time I could have done something like programmatically give focus to the "new" textarea.

## Post text
- As it is now, employee popover information is computed and prepared on render of the post. But in order to get the most recent information and avoiding a request for info before hovering the chip, we could probably create a separate component for the popover and do the request there.

## Admin Page
- For better structuring and encapsulating render changes the component admin-page should have been split into three:
    - admin-page
    - edit-employee
    - employee-list

## Edit/Create employee form
- Phone number input should have been of type number. But then min and max length validations would not work, only min and max number values. However, leaving it as text the user is able to input letters into the field which is not good. A possible approach would have been for example to leave it as number type and create a custom validation directive to cast to string and check it's length.
- In a real app checking for unique phone numbers is an async validation. Meaning it requires a request to the back-end and waiting for the response before we confirm the edit or add the user we need to make sure we have waited for the validation response and everything is okay.. This means it should be handled in a different way. From what I've learned the Reactive Forms validation already provide a way to handle async checks, so something similar to that should be used.
- I did the pattern for checking the username provided format using a custom Angular directive, but I learned after that I could have used the pattern attribute in the input and Angular has already a directive to pick it up and use just like the other validations.
- Employee id should not be generated on the front-end and should be the back-end handling it.

## Services and general architecture:
- Depending on the requirements of the rest of the app, I would probably model the employees and posts differently by having them in a centralized app state store. Then we could fetch the lists by triggering certain state actions and the components would be "attached" to an observer, triggering a re-render when the observable changes. This could be achieved with simple rxjs or with the Redux like ngrx libraries.
- Both services that manage data have a very similar contract and implementation. On a real app, depending on the back-end this would probably also be true. So in order to reduce "duplicated" code, we could have an hierarchy of services where for example the ones here would fall on CRUD services, or some other abstraction.

## Tests
- Tests should exist for every component, service, directive, etc. As well as a smaller set of E2E. In order to do this I would follow the standard Angular approach of Karma + Jasmine for Unit tests and Protractor + Jasmine for the E2E.
- I would probably try to follow a more "immutable" structure for the tests, calling a setup function for each test instead of using beforeEach and let (like argued about in Angular docs).
- I would introduce several test scenarios and not just the "normal path" one.
- I would improve the tests done by reducing duplicated code.