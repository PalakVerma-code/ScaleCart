import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";//to dispatch actions to store //to add item to cart
import {addToCart} from "../redux/slices/cartSlice";//import action to add item to cart

const ProductCard=({product})=>{
    const dispatch=useDispatch();
    return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg bg-gray-100"
      />
      <div>
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-orange-500 font-bold text-xl">
          ${product.price}
        </span>
        <div className="flex gap-2">
          <Link
            to={`/products/${product._id}`}
            className="text-sm border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Details
          </Link>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="text-sm bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;