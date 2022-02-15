import { createContext } from "react";
import { BookFile } from "../../pages/Form";
import { File } from "./BooksProvider";
import { BookAction, Like } from "./booksReducer";


interface BooksContextProps {
    bookhistory?:BookFile;
    bookshistories?: BookFile[];
    booksLikes?: Like[];
    filesTotal?: number;
    activeFile?: BookFile;


    fileDispatch: React.Dispatch<BookAction>;
    doFileSave: ( data:File ) => Promise<boolean>;
    doUpdateFile: ( id:string, data:File ) => Promise<boolean>;
    doDeleteFile: ( id:string ) => Promise<boolean>;
    loadFiles:  () => void;
    loadLikes:  () => void;
    pageChange:  ( page:number ) => void;
    doSelectFle: ( file:BookFile ) => void;
    doClearSelectedFile: () => void
}


export const BooksContext = createContext( {} as BooksContextProps )