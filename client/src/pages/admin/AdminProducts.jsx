//main goal of this page is to show all the products in the database and allow the admin to edit or delete them
import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {fetchAdminProducts,deleteProduct,updateOrderStatus,uploadProductImage,updateProduct,createProduct,clearAdminState} from '../../redux/slices/adminSlice';
import {Link} from 'react-router-dom';

//empty form data for creating or editing product

const emptyForm={
   name:'',
   price:'',
   description:'',stock:'',image:''
}
const AdminProducts=()=>{
    const dispatch=useDispatch();//get dispatch function from Redux
    const {products,loading,error,pages,limit,imageUrl,success}=useSelector(state=>state.admin);//get products from admin state in Redux store
    const [showModal,setShowModal]=useState(false);//state to control modal visibility
    const [editingId,setEditingId]=useState(null);//state to hold id of product being edited
    const [form,setForm]=useState(emptyForm);
    const [page,setPage]=useState(1);//state to hold current page number for pagination
    const [keyword,setKeyword]=useState('');//state to hold search keyword for filtering products

    useEffect(()=>{
        dispatch(fetchAdminProducts({page,limit:6,keyword}));//fetch products when component mounts or page/keyword changes
    },[dispatch,page,keyword])//re-run effect when dispatch, page, or keyword changes
  //when cloudinary upload finshes, update form image field with returned image URL
  useEffect(()=>{
    if(imageUrl){
        setForm(prev=>({...prev,image:imageUrl}));//update form image field with returned image URL
    }    
  },[imageUrl])//re-run effect when imageUrl changes

  //close model and reset form when modal is closed
  useEffect(()=>{
    if(success){
        setShowModal(false);
        setForm(emptyForm);
        setEditingId(null);
        dispatch(clearAdminState());//clear admin state to reset success flag
    }
  },[success,dispatch])//re-run effect when success or dispatch changes

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});//update form state when input changes
  }
  //handle imgage file selection and upload to cloudinary
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(!file)return;
    const formData= new FormData();
    formData.append('image',file);
    dispatch(uploadProductImage(formData));//dispatch uploadProductImage action to upload image to cloudinary

  }
  const handleSubmit=()=>{
    const productData={
      name:form.name,
        price:parseFloat(form.price),//convert price to number
        description:form.description,
        stock:parseInt(form.stock),//convert stock to number
        image:form.image
    }
    if(editingId){
      dispatch(updateProduct({id:editingId,productData}));//dispatch updateProduct action to update existing product
    } else {
      dispatch(createProduct(productData));//dispatch createProduct action to create new product
    }
  }
  //pre fill form with product data when edit button is clicked
  const handleEdit=(product)=>{
    setEditingId(product._id);//set editingId to product id being edited
    setForm({
        name:product.name,
        price:product.price.toString(),
        description:product.description,
        stock:product.stock.toString(),
        image:product.image
    })//pre-fill form with product data for editing
    setShowModal(true);//show modal for editing
  }  

  //delete product when delete button is clicked

  const handleDelete=(id)=>{
    if(window.confirm('Are you sure you want to delete this product?')){//confirm before deleting
        dispatch(deleteProduct(id));//dispatch deleteProduct action to delete product
    }
  }  
   const openCreateModal=()=>{
    setEditingId(null);//reset editingId to null for creating new product
    setForm(emptyForm);//reset form to empty for creating new product
    dispatch(clearAdminState());//clear admin state to reset any previous success or error messages
    setShowModal(true);//show modal for creating new product
   }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={openCreateModal}
          className="bg-orange-500 text-white px-5 py-2.5 rounded-xl hover:bg-orange-600 font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => { setKeyword(e.target.value); setPage(1) }}
        placeholder="Search products..."
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {/* Products Table */}
      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">Product</th>
                <th className="text-left px-4 py-3 text-gray-600">Price</th>
                <th className="text-left px-4 py-3 text-gray-600">Stock</th>
                <th className="text-left px-4 py-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                    />
                    <span className="font-medium">{product.name}</span>
                  </td>
                  <td className="px-4 py-3 text-orange-500 font-bold">
                    ${product.price}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${product.stock < 5
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */} 
      {/* show pagination buttons if there are more than 1 page of products */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium
                ${page === i + 1
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <h2 className="text-xl font-bold mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock quantity"
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"//accept only image files like .jpg, .png, .jpeg
                  onChange={handleImageChange}
                  className="text-sm text-gray-500"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-2 h-24 rounded-lg object-cover"
                  />
                )}
                {loading && (
                  <p className="text-xs text-gray-400 mt-1">
                    Uploading image...
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl text-sm hover:bg-orange-600 disabled:opacity-60"
              >
                {loading
                  ? 'Saving...'
                  : editingId ? 'Update Product' : 'Create Product'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

    }
    export default AdminProducts;