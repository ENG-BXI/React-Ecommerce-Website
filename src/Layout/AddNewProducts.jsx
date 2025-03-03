import React, { useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios';
import { BASEURL, CATEGORIES } from '../Api/endPoint';

const AddNewProducts = () => {
    let [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
    });
    let [category,setCategory] = useState([])
    let [images, setImages] = useState([]);
   async function getCategory() {
       let { data, errorMessage } = await useAxios.getCategory(`${BASEURL}/${CATEGORIES}`);
       if (!errorMessage) 
           setCategory(data); 
    }
    useEffect(() => {
        getCategory()
    }, []);
    function ChangeForm(e) {
        setForm({ ...form, [e.target.id]: e.target.value });
        console.log(form);
        console.log(e.target.value);
        
    }
  return (
      <div>
          <h2>Add New Product</h2>
          <form>
              <label className='form-label' htmlFor="category">Category</label>
              <select  value={form.category} onChange={(e)=>ChangeForm(e)} name="category" className='form-select text-white bg-dark border-dark mb-3' id="category">
                 {category.length >0 && category.map((element , index)=><option key={index} >{element.title}</option>)}
              </select>
          
              <label className='form-label' htmlFor="title">Title</label>
              <input type="text" id='title' value={form.title} onChange={(e)=>ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required  />
              
              <label className='form-label' htmlFor="description">Description</label>
              <input type="text" id='description' value={form.description} onChange={(e)=>ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required  />
              
              <label className='form-label' htmlFor="price">Price</label>
              <input type="number" id='price' value={form.price} onChange={(e)=>ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3' required  />
              
              <label className='form-label' htmlFor="discount">Discount</label>
              <input type="number" id='discount' value={form.discount} onChange={(e)=>ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3'  />
              
              <label className='form-label' htmlFor="About">About</label>
              <input type="text" id='About' value={form.About} onChange={(e)=>ChangeForm(e)} className='form-control bg-dark text-white border-dark mb-3'  />
              
              <label className='form-label' htmlFor="images">Images</label>
              <input type="file" id='images' multiple value={images} onChange={(e)=>setImages(e.target.files.item)} className='form-control bg-dark text-white border-dark mb-3'  />

              
              <button className="btn btn-primary">Done</button>
              
          </form>
      </div>
  )
}

export default AddNewProducts