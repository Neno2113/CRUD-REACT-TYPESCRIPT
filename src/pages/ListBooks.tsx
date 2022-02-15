import { useNavigate } from 'react-router-dom';
import { List, } from 'antd';
import { useContext, useEffect,  } from 'react';
import { BooksContext } from '../context/file/BooksContext';
import { BookFile } from './Form';



export const ListBooks = () => {

  const { loadFiles, loadLikes, bookshistories, filesTotal, pageChange, doSelectFle  } = useContext( BooksContext );
  let navigate = useNavigate();
  


  useEffect(() => {
    loadFiles()
    loadLikes()
    
  }, [loadFiles, loadLikes]);
  
  const handleActiveFile = ( file:BookFile) => {
    doSelectFle( file )
    navigate('/formulario');
  }
  

  return (
      <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          pageChange( page );
        },
        pageSize: 5,
        total: filesTotal
      }}
      dataSource={bookshistories}
      renderItem={item => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={272}
              height={200}
              alt="logo"
              src={ item.image || 'https://leadershiftinsights.com/wp-content/uploads/2019/07/no-book-cover-available.jpg'}  
            />
          }
        >
          <List.Item.Meta
            // avatar={<Avatar  />}
            title={<a onClick={ () => handleActiveFile( item )}>{item.title}</a>}
            description={item.description}
          />
          {item.description}
        </List.Item>
      )}
    />
  )
};
