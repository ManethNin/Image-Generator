import React,{useState} from 'react'
import {formFeild, Loader} from '../components';
import {useNavigate} from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });

  const [loading, setLoading] = useState(false);
  const [generatingImg, setGebneratingImg] = useState(false);

  return (
  <section className='max-w-7xl mx-auto'>
    <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create Image</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Create imaginative and visually stunning images through DALL-E AI and share</p>

      </div>

      <form className ='mt-16 max' action=""></form>
  </section>  )
}

export default CreatePost