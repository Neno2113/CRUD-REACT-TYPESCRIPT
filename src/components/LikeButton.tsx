import { Button, Space } from "antd";
import { createElement, useContext } from "react";
import { BooksContext } from "../context/file/BooksContext";

export const LikeButton = ({ icon, ficha }:any) => {

    const { doAddLike } = useContext( BooksContext );
      
  const handleLike = ( ficha:string ) => {
    doAddLike( ficha );
    
  }

    return (
        <Button type='text' onClick={ () => handleLike( ficha) } >
            <Space>
            {createElement(icon)}
            </Space>
      </Button>
    )
};
