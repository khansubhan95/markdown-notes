import * as actionTypes from "../actions";

const initialState = {
  notes: [],
  selectedNoteId: null,
  selectedNoteTitle: "",
  selectedNoteContent: "",
  formError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NOTES:
      return {
        ...state,
        notes: action.notes
      };
    case actionTypes.SELECT_NOTE:
      return {
        ...state,
        selectedNoteId: action.note.selectedNoteId,
        selectedNoteTitle: action.note.selectedNoteTitle,
        selectedNoteContent: action.note.selectedNoteContent
      };
    case actionTypes.NEW_NOTE:
      return {
        ...state,
        selectedNoteId: null,
        selectedNoteTitle: "",
        selectedNoteContent: ""
      };
    case actionTypes.DELETE_NOTE:
      let notesArr = [...state.notes];
      const deleteNoteIndex = notesArr.findIndex(n => n.id === action.id);
      notesArr.splice(deleteNoteIndex, 1);
      return {
        ...state,
        notes: notesArr,
        selectedNoteId: null,
        selectedNoteTitle: "",
        selectedNoteContent: ""
      };
    case actionTypes.TITLE_UPDATE:
      return {
        ...state,
        selectedNoteTitle: action.title
      };
    case actionTypes.CONTENT_UPDATE:
      return {
        ...state,
        selectedNoteContent: action.content
      };
  }
  return state;
};

export default reducer;
