import { useContext, useState,  } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload, 
  message,
} from 'antd';
import { DeleteOutlined, SaveFilled, UploadOutlined } from '@ant-design/icons';
import { BooksContext } from '../context/file/BooksContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BookFile,  } from '../interfaces/File';

const { TextArea } = Input;



const buttonItemLayout ={
      wrapperCol: { span: 14, offset: 5 },
  };


export const FormPage = () => {

  const { doFileSave, activeFile, doUpdateFile, doDeleteFile } = useContext( BooksContext );
  const [image, setImage] = useState('');
  let navigate = useNavigate()

  console.log(activeFile);
  
  let initialForm = {
    title: '',
    author: '',
    description: '',
    fecha_pub: '',
    image: ''
  }

  const handleFinish = async(values:BookFile) => {
    values.fecha_pub = values.fecha_pub.format('YYYY-MM-DD')
    
    if( image === ""){
      setImage( activeFile?.image! )
    }
    values.image = image;

    console.log();
    

    let save;
    if(activeFile){
      save = await doUpdateFile( activeFile.id!, values); 
    } else {
      save = await doFileSave( values ); 
    }
      
    if( save === true ){
      navigate('/');

    }
  }
  
  if( activeFile ){
    activeFile!.fecha_pub = ''
    initialForm = activeFile; 
  } 

  const uploadFile = {
    name: 'file',
    action: 'https://api.cloudinary.com/v1_1/degkh4ktj/upload',
    data: {
      'upload_preset': 'file-image'
    },
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setImage( info.file.response.url)
        
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleDeleteFile = ( id:string ) => {
    Swal.fire({
      title: 'Estas seguro de eliminar esta ficha?',
      text: "Eliminara esta ficha por completo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminala!'
    }).then( async(result) => {
      if (result.isConfirmed) {
       const fileDeleted = await doDeleteFile( id )

       if( fileDeleted === true){
        navigate('/');
       }

      }
    })
  }

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={initialForm}
      onFinish={  handleFinish }
    >
    
      <Form.Item label="Titulo" 
        name='title' 
        rules={[
          {
            required: true,
            message: 'The title is required'
          }
        ]}
      >
        <Input 
    
        />
      </Form.Item>
      <Form.Item label="Autor"
        name='author' 
        rules={[
          {
            required: true,
            message: 'The author is required'
          }
        ]}
      >
        <Input
   
        />
      </Form.Item>
      <Form.Item label="Fecha publicacion"
        name='fecha_pub' 
        rules={[
          {
            required: true,
            message: 'The date is required'
          }
        ]}
      >
        <DatePicker
        />
      </Form.Item>
      <Form.Item label="Descripcion" 
        name='description' 
        rules={[
          {
            required: true,
            message: 'The description is required'
          }
        ]}
      >
        <TextArea 
          rows={4} 
          showCount 
          maxLength={200}
    
          name='description'
        />
      </Form.Item>
      <Form.Item label="Imagen" >
        <Upload {...uploadFile}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item { ...buttonItemLayout }>
        <Button type="primary" icon={<SaveFilled />}  htmlType="submit">
          Guardar
        </Button>
        {
          activeFile && 
          (
            <Button type="primary" onClick={ () => handleDeleteFile( activeFile.id! ) } style={{ marginLeft: '100px'}} icon={<DeleteOutlined />} danger>
              Eliminar
            </Button>
          )
        }
      
      </Form.Item>

    </Form>
  );
};
