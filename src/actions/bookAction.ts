import { BookAction } from "../context/file/booksReducer";
import { BookFile } from "../pages/Form";




export const doSetHistoryBook = ( bookFile:BookFile ):BookAction => ({
    type: 'setBookHistory',
    payload: bookFile
});



export const doSetHitoriesBooks = ( bookFiles:BookFile[] ): BookAction => ({
    type: 'setBooksHistories',
    payload: bookFiles
})