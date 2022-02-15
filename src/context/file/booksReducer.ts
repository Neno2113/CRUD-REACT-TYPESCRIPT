import { BookFile } from "../../pages/Form";

export interface BookState{
    bookhistory?:BookFile ;
    bookshistories?: BookFile[];
    booksLikes?: Like[];
    filesTotal?: number;
    activeFile?:BookFile
}

export interface Like {
    id: string;
    count: number;
}

export type BookAction = 
| { type: 'setBookHistory', payload:BookFile }
| { type: 'setBooksHistories', payload: BookFile[ ] }
| { type: 'setBookLikes', payload: Like[ ] }
| { type: 'setTotalFiles', payload: number }
| { type: 'setActiveFile', payload: BookFile }
| { type: 'clearActiveFile' }
| { type: 'updateFile', payload: BookFile }
| { type: 'deleteFile', payload: BookFile }


export const bookReducer = ( state: BookState, action: BookAction ):BookState => {

    switch (action.type) {
        case 'setBookHistory':
            return {
                ...state,
                bookhistory: action.payload,
                bookshistories: [ action.payload, ...state.bookshistories! ],
                activeFile: undefined
            }
        case 'setBooksHistories':
            return {
                ...state,
                bookshistories: action.payload
            }
        case 'setBookLikes':
            return {
                ...state,
                booksLikes: action.payload
            }
        case 'setTotalFiles': 
            return {
                ...state,
                filesTotal: action.payload
            }
        case 'setActiveFile':
            return {
                ...state,
                activeFile: action.payload
            }
        
        case 'clearActiveFile':
            return {
                ...state,
                activeFile: undefined
            }
        case 'updateFile': 
            return {
                ...state,
                bookshistories: state.bookshistories?.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        case 'deleteFile':
            return {
                ...state,
                bookshistories: state.bookshistories?.filter(
                    f => ( f.id !== state.activeFile?.id )
                ),
                activeFile: undefined
            }
    
        default:
            return state;
    }
}