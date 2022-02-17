import { createContext } from "react";
import { BookFile } from "../../interfaces/File";
import { Like } from "../../interfaces/like";
import { File } from "./BooksProvider";
import { BookAction,  } from "./booksReducer";


interface BooksContextProps {
    bookhistory?:BookFile;
    bookshistories?: BookFile[];
    booksLikes?: Like[];
    filesTotal?: number;
    activeFile?: BookFile;

    //methods
    fileDispatch: React.Dispatch<BookAction>;
    doFileSave: ( data:File ) => Promise<boolean>;
    doUpdateFile: ( id:string, data:File ) => Promise<boolean>;
    doDeleteFile: ( id:string ) => Promise<boolean>;
    loadFiles:  () => void;
    loadLikes:  () => void;
    pageChange:  ( page:number ) => void;
    doSelectFle: ( file:BookFile ) => void;
    doClearSelectedFile: () => void;
    doAddLike: ( ficha:string ) => Promise<boolean>;
    doDeleteLike: ( ficha:string ) => Promise<boolean>;
}


export const BooksContext = createContext( {} as BooksContextProps )