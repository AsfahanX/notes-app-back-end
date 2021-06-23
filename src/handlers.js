const {nanoid} = require('nanoid');
const notes = require('./notes');


// #region JSDoc typedef
/**
 * @callback RouteHandler
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @returns {import('@hapi/hapi').Lifecycle.ReturnValue}
 */

/**
 * @typedef {import('@hapi/hapi')} siap
 */
// #endregion


/**
 * @type {RouteHandler}
 */
function deleteAllNotes(request, h) {
  request.params;
  return 'oke';
}


/**
 * @type {import('@hapi/hapi').ServerRoute['handler']}
 */
const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;
  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };
  notes.push(newNote);
  const isSuccess = notes
      .filter((note) => note.id === id)
      .length > 0;

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
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};


const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

/**
 * @type {import('@hapi/hapi').ServerRoute['handler']}
 */
const getNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const note = notes
      .filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};


/**
 * @type {import('@hapi/hapi').ServerRoute['handler']}
 */
const editNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const {title, tags, body} = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

/**
 * @type {import('@hapi/hapi').ServerRoute['handler']}
 */
const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};



module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
  deleteAllNotes,
};

