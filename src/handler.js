const { nanoid } = require("nanoid");
const notes = require("./notes");

//TODO : adding note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "New note added",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Note failed to add",
  });
  response.code(500);
  return response;
};

//TODO : get all notes
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

//TODO  : get note by id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "failed",
    message: "Data not found",
  });
  response.code(404);
  return response;
};

//TODO : edit note by id
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], title, tags, body, updatedAt };
    const response = h.response({
      status: "success",
      message: "Edited successfully",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "failed",
    message: "Cannot edit. Id not found",
  });
  response.code(404);
  return response;
};

//TODO : delete note by id
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Data deleted successfully",
    });
    response.code(204);
    return response;
  }
  const response = h.response({
    status: "failed",
    message: "data not found",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
