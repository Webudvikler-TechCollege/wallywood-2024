import axios from "axios"
import { useAuth } from "../Providers/AuthProvider"
import { useCartItems } from "../Providers/CartProvider"
import { AddToCartButtonStyle } from "./AddToCartButtonStyle"

const AddToCartButton = (props) => {
  const { loginData } = useAuth()
  const { cartItems, setCartItems } = useCartItems()

  const clickHandle = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      }
    }

    const formdata = new URLSearchParams()
    formdata.append("poster_id", props.id)
    formdata.append("quantity", 1)

    const endpoint = `http://localhost:3000/cart`
    const result = await axios.post(endpoint, formdata, options)
    if (result.data) {
      const newCartItems = await axios.get(endpoint, options)
      setCartItems(newCartItems.data)
    }
  }

  return (
    <>
      {cartItems.find((x) => x.poster.id === props.id) ? (
        <span>Dette produkt ligger i kurven</span>
      ) : (
        <>
        <input type="number" min="1" name="quantity"></input>
        <AddToCartButtonStyle onClick={clickHandle}>
          {props.children}
        </AddToCartButtonStyle>
        </>
      )}
    </>
  )
}

export default AddToCartButton
