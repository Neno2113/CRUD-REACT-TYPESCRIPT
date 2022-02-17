import { Button, Space } from "antd";
import { createElement, useContext } from "react";
import { BooksContext } from "../context/file/BooksContext";

export const DislikeButton = ({ icon, ficha }:any) => {

    const { doDeleteLike } = useContext( BooksContext );

    const handleDislike = ( ficha:string ) => {
        doDeleteLike( ficha )
        
    }

    return (
        <Button type='text' onClick={ () => handleDislike( ficha ) } >
            <Space>
            {createElement(icon)}
            </Space>
      </Button>
    )
};
