import { useCallback, useReducer } from "react";
import { fetchWithToken } from "../../helpers/fetch";
import { Props } from "../../interfaces/props";
import { BooksContext } from "./BooksContext";
import { bookReducer, BookState } from "./booksReducer";
import Swal from "sweetalert2";
import { BookFile } from "../../pages/Form";


const InitialState: BookState = {
    bookhistory: undefined,
    bookshistories: [],
    filesTotal: 0,
    activeFile: undefined
}

export interface File{
    title: string;
    author: string;
    fecha_pub: string;
    description: string;
    image?: string;
}


export const BooksProvider = ({ children }: Props ) => {

    const [fileState, fileDispatch] = useReducer( bookReducer, InitialState);

    const doSelectFle = ( file:BookFile ) => {
        fileDispatch({ type: 'setActiveFile', payload: file})
    }

    const doClearSelectedFile = ( ) => {
        fileDispatch({ type: 'clearActiveFile' });
    }

    const doFileSave = async( data:File ) => {
        const resp = await fetchWithToken('file/save', data, 'POST');
        const body = await resp.json();

        if( body.ok ){
            fileDispatch({ type: 'setBookHistory', payload: body.ficha } )
            
            return true;
        } else {
            Swal.fire('File Save Error', body.msg, 'error');
            return false;
        }
    }

    const doUpdateFile = async( id: string, data:File ) => {
        const resp = await fetchWithToken(`file/${id}`, data, 'PUT');
        const body = await resp.json();

        if( body.ok ){
            fileDispatch({ type: 'updateFile', payload: body.file } )
            
            return true;
        } else {
            Swal.fire('File Save Error', body.msg, 'error');
            return false;
        }
    }

    const doDeleteFile = async( id: string ) => {
        const resp = await fetchWithToken(`file/${id}`, {}, 'DELETE');
        const body = await resp.json();

        if( body.ok ){
            fileDispatch({ type: 'deleteFile', payload: body.file } )
            Swal.fire(
                'Eliminada!',
                'La ficha ha sido eliminada!.',
                'success'
            )
            return true;
        } else {
            Swal.fire('File Save Error', body.msg, 'error');
            return false;
        }
    }

    const loadFiles = useCallback( async() => {
        const resp = await fetchWithToken('file/', {} , 'GET');
        const body = await resp.json()

        if( body.ok ){
            fileDispatch({ type:'setBooksHistories', payload: body.files });
            fileDispatch({ type: 'setTotalFiles', payload: body.total})
        }
        
    }, []);

    const loadLikes = useCallback( async() => {
        const resp = await fetchWithToken('like/', {} , 'GET');
        const body = await resp.json()

        if( body.ok ){
            fileDispatch({ type:'setBookLikes', payload: body.likes });
        }
        
    }, []);
    
    const pageChange = async( page:number) => {
        
        const limite = 5;
        const desde = page * 5 - limite;
        const resp = await fetchWithToken(`file/?limite=${limite}&desde=${desde}`, {}, 'GET');
        const body = await resp.json()
        
        if( body.ok ){
            fileDispatch({ type:'setBooksHistories', payload: body.files });
            fileDispatch({ type: 'setTotalFiles', payload: body.total})
        }

    }


    return (
        < BooksContext.Provider value={{
            ...fileState,

            //methods
            fileDispatch,
            doFileSave,
            doUpdateFile,
            loadFiles,
            loadLikes,
            pageChange,
            doSelectFle,
            doClearSelectedFile,
            doDeleteFile
        }}>
            { children }

        </BooksContext.Provider>
    )
};
