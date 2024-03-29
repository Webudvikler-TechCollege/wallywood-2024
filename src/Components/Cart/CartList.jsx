import { CartListStyle } from "./CartList.style";
import { useCartItems } from './CartProvider'
import { useAuth } from "../Auth/AuthProvider";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const CartList = () => {
	const { cartItems, setCartItems } = useCartItems()
	const { loginData } = useAuth()
	console.log(cartItems);


	let sum = cartItems.reduce((prev, current) => {
		return prev + +current.poster.price
	}, 0)

	const handleTrashClick = async (id) => {
		const options = {
			headers: {
				Authorization: `Bearer ${loginData.access_token}`
			}
		}
		const endpoint = `http://localhost:3000/cart/${id}`
		const result = await axios.delete(endpoint, options)
		if(result.data) {
			const endpoint = `http://localhost:3000/cart`
			const newCartData = await axios.get(endpoint, options)
			setCartItems(newCartData.data)
		}
	}

	return (
		<CartListStyle>
			<div>
				<div>Produkt</div>
				<div>Antal</div>
				<div>Pris</div>
				<div>Handling</div>
			</div>
		{cartItems && cartItems.map(item => {
			return (
				<div key={item.id}>
					<div>{item.poster.name}</div>
					<div>{item.quantity}</div>
					<div>{item.poster.price},00 DKK</div>
					<div><AiFillDelete onClick={() => handleTrashClick(item.id)} /></div>
				</div>
			)
		})}
			<div>
				<div>Total</div>
				<div></div>
				<div>{sum},00 DKK</div>
			</div>	
		</CartListStyle>
	);
}

export default CartList;
