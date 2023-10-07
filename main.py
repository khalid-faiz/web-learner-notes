import json, nanoid
from datetime import date
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Load the notes
# Check if the file isn"t there
with open("notes.json", "a") as notesDb:
    pass
with open("notes.json") as notesDb:
    notesTxt = notesDb.read()
    if notesTxt == "":
        with open("notes.json", "a") as notesDb:
            notesDb.write("[]")

# now load the notes into python
with open("notes.json") as notesDb:
    notes = json.loads(notesDb.read())


@app.route("/")
def index():
    # render from the global notes variable
    global notes
    # search for notes
    if request.args.get("keyword"):
        # fetch keyword
        keyword = request.args.get("keyword")
        lowerCaseKW = keyword.lower()

        # filter notes
        filteredNotes = []
        for note in notes:
            name = note["name"].lower()
            description = note["description"].lower()
            if name.find(lowerCaseKW) != -1:
                filteredNotes.append(note)
                continue
            if description.find(lowerCaseKW) != -1:
                filteredNotes.append(note)
        
        # render results
        return render_template("search.html", notes=filteredNotes, keyword=keyword)
    
    if request.full_path == "/?keyword=":
        return redirect("/")
        
    # render homepage
    return render_template("index.html", notes=notes)

@app.route("/add-note")
def addNote():
    # edit the global notes variable
    global notes
    # get the new note
    args = request.args
    newNote = {
        "id": nanoid.generate(),
        "name": args.get("name"),
        "description": args.get("description"),
        "date": date.today().__str__()
    }

    # add it to the list and dump that to the file
    notes.append(newNote)
    with open("notes.json", "w") as notesDb:
        notesDb.write(json.dumps(notes))
    
    # go back to the home page once we add the note
    return redirect("/")

# route for viewing the datails
@app.route('/note-details')
def noteDetails():
    global notes

    if request.args.get("id"):
        # fetch id
        noteID = request.args.get("id")
        # filter out the note which should be deleted
        noteToShow = list(filter(lambda x: x["id"] == noteID, notes))[0]

        # render with the details template
        return render_template("details.html",note=noteToShow)

# route for editing a note
@app.route('/edit-note')
def editNote():
    global notes

    args = request.args

    # for editing the note
    if args.get("id") and args.get("name"):
        # fetch info
        edittedNote = {
            "id": args.get("id"),
            "name": args.get("name"),
            "description": args.get("description"),
            "date": args.get("date")
        }

        # updating the notes and dumping
        updatedNotes = []
        for note in notes:
            if note["id"] == edittedNote["id"]:
                updatedNotes.append(edittedNote)
            else:
                updatedNotes.append(note)
        
        notes = updatedNotes
        with open("notes.json", "w") as notesDb:
            notesDb.write(json.dumps(notes))
        
        # render home
        return redirect("/")


    if args.get("id"):
        # fetch id
        noteID = request.args.get("id")
        # filter out the note which should be deleted
        noteToShow = list(filter(lambda x: x["id"] == noteID, notes))[0]

        # render with the details template
        return render_template("edit.html",note=noteToShow)

# route for deleting a note
@app.route('/delete-note')
def deleteNote():
    # edit the global notes variable
    global notes

    if request.args.get("id"):
        # fetch id
        noteID = request.args.get("id")
        print(noteID)
        # filter out the note which should be deleted
        noteToDelete = list(filter(lambda x: x["id"] == noteID, notes))[0]
        # remove the note and dump the list to json
        notes.remove(noteToDelete)
        with open("notes.json", "w") as notesDb:
            notesDb.write(json.dumps(notes))
        
    # go back to the home page
    return redirect("/")

# delete all notes
@app.route('/delete-all-notes')
def deleteAllNotes():
    # edit the global notes variable
    global notes
    notes = []
    with open("notes.json", "w") as notesDb:
        notesDb.write("[]")
    return redirect("/")