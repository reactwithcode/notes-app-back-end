// 4b
const { 
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNoteByIdHandler,
  deleteNotesByIdHandler,
} = require('./handler');

// 3
const routes = [
  {
    method: 'POST',
    path: '/notes',
    // 4b
    handler: addNoteHandler,
    // 5b to allow foreign origin access our origin
    // options: {
    //     cors: {
    //         origin: ['*'],
    //     }
    // }
  },
  // 6a
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // 6c
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesByIdHandler,
  },
  // 7a
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  // 8a
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesByIdHandler,
  },
];

module.exports = routes;
