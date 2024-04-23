import { FormData } from '@/pages/add-blog';
import { SetStateAction } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type TTextEditorProps = {
  formData: FormData;
  setFormData: React.Dispatch<SetStateAction<FormData>>;
};

const TextEditor: React.FC<TTextEditorProps> = ({ formData, setFormData }): JSX.Element => {
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'font',
    'align',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ font: [] }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ],
  };

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      placeholder="Start writing here&hellip;"
      theme="snow"
      onChange={(value) => setFormData({ ...formData, description: value })}
      value={formData.description}
    />
  );
};

export default TextEditor;
