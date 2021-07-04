// 4a
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  // to get json of body request
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// 6b
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// 6d
const getNotesByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

// 7b
const editNoteByIdHandler = (request, h) => {
  // use route params to get id
  const { id } = request.params;

  // to get data from client by body request
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  // index -1 means index is not found
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt
    };

    const response = h.response({
      status: 'success',
      message: 'Catatam berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan, Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// 8b
const deleteNotesByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNotesByIdHandler, 
  editNoteByIdHandler, 
  deleteNotesByIdHandler, 
};
