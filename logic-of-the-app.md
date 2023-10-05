# Description

It is an app for note-taking, it'll be built using flask as a backend, and vanilla JS, with HTML and CSS as a frontend.

## Basic Functionality

### Welcome Message

- Ask a user for their name upon the first launch of the app.
- Then display a welcome message once they set thier name.
- Subsequent requests should display, welcome back.

### Note Actions

A user should be able to:
- Add a note: I would like to add a detailed note description, and time (automatically logged).
- Editing a note.
- Remove any individual note.
- Remove all notes.
- Search with a kw in both the note and the detailed description.
- Download a backup copy for all thier notes (potentially add a section for restoring)

## Views

1. First check if its the first time for the user, by checking their localStorage for a name:
   - Not found: render an input field asking for their name, and a button to update the UI with their name saying `Wellcome ${user}`, also display a message to encourage them to add a note.
   - Found: Display the normal UI, but with a different message `Wellcome back ${user}`, and a different message for adding notes if not found.
2. I would like the home page to be simple just showing the note name and date, ordered chronologically, along-side a title, add a note and remove all buttons (I can use the item-list local storage interface, but add some tweaks to it) 
   - Add a note button shows a modal dialog this time, then adds a note to the backend, and the dialog fades.
   - I am going to use a python dictionary (with json library, so keeping the note is easeier), dumping that to a file every time a change happens, and loading the file at the begining of the program
   - I'll add a remove all button to issue a delete request to delete all note.
   - I can add a button for backup (redirect to a different route).
   - the list of notes will contain just one button for viewing the details of the note.
3. Note details will have delete, and edit options, while serving the purpose of showing the details of the note.
4. Search: I'll Add a search bar at the top of the home page, once the user hits search, they'll be redirected to the results page.

## Styling

I'll use the same styling I had for items-list