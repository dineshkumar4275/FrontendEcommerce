'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import {
  XMarkIcon,
  ShoppingCartIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  CreditCardIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

export default function CartSidebar({
  isOpen,
  onClose,
}) {
  const [cartItems, setCartItems] =
    useState([]);

  const [total, setTotal] =
    useState(0);

  const [couponCode,
    setCouponCode] =
    useState('');

  const [discount,
    setDiscount] =
    useState(0);

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  useEffect(() => {
    const updateCart = () =>
      loadCart();

    window.addEventListener(
      'cartUpdated',
      updateCart
    );

    return () => {
      window.removeEventListener(
        'cartUpdated',
        updateCart
      );
    };
  }, []);

  const loadCart = () => {
    const cart =
      localStorage.getItem(
        'cartItems'
      );

    if (cart) {
      const items =
        JSON.parse(cart);

      setCartItems(items);

      calculateTotal(items);
    } else {
      setCartItems([]);
      setTotal(0);
    }
  };

  const calculateTotal = (
    items
  ) => {
    const amount =
      items.reduce(
        (sum, item) =>
          sum +
          (item.price || 0) *
          (item.quantity || 1),
        0
      );

    setTotal(amount);
  };

  const updateQuantity = (
    id,
    quantity
  ) => {

    if(quantity < 1)
      return;

    const updated =
      cartItems.map(
        item =>
        item.id===id
        ? {
            ...item,
            quantity
          }
        : item
      );

    setCartItems(updated);

    localStorage.setItem(
      'cartItems',
      JSON.stringify(updated)
    );

    calculateTotal(updated);

    window.dispatchEvent(
      new Event(
        'cartUpdated'
      )
    );
  };

  const removeItem = (
    id,
    name
  ) => {

    const updated =
      cartItems.filter(
        item =>
        item.id !== id
      );

    setCartItems(updated);

    localStorage.setItem(
      'cartItems',
      JSON.stringify(updated)
    );

    calculateTotal(updated);

    window.dispatchEvent(
      new Event(
        'cartUpdated'
      )
    );

    toast.success(
      `${name} removed`
    );
  };

  const applyCoupon=()=>{

    if(
      couponCode==="SAVE10"
      &&
      total>=500
    ){

      setDiscount(
        total*0.10
      );

      toast.success(
      "10% discount applied"
      );

    }

    else if(
      couponCode==="SAVE20"
      &&
      total>=1000
    ){

      setDiscount(
        total*0.20
      );

      toast.success(
      "20% discount applied"
      );

    }

    else{

      toast.error(
      "Invalid coupon"
      );

    }
  };

  const FREE_DELIVERY=499;

  const deliveryCharge=
  total>=FREE_DELIVERY
  ?0
  :40;

  const gst=
  (total-discount)
  *0.18;

  const finalTotal=
  total
  -discount
  +deliveryCharge
  +gst;

  return(
  <>
    <AnimatePresence>

    {isOpen&&(

      <motion.div
      initial={{
        opacity:0
      }}

      animate={{
        opacity:1
      }}

      exit={{
        opacity:0
      }}

      onClick={
      onClose
      }

      className="
      fixed
      inset-0
      bg-black/60
      z-40
      "
      />

    )}

    </AnimatePresence>

    <AnimatePresence>

    {isOpen&&(

    <motion.div

    initial={{
      x:'100%'
    }}

    animate={{
      x:0
    }}

    exit={{
      x:'100%'
    }}

    className="
    fixed
    right-0
    top-0
    h-screen
    w-full
    max-w-md
    bg-white
    z-50
    flex
    flex-col
    "

    >

    {/* Header */}

    <div
    className="
    p-4
    bg-gradient-to-r
    from-purple-600
    to-pink-600
    text-white
    flex
    justify-between
    ">

    <div
    className="
    flex
    gap-3
    items-center
    ">

    <ShoppingCartIcon
    className="w-7 h-7"/>

    <div>

    <h2
    className="
    font-bold
    ">
    Shopping Cart
    </h2>

    <p
    className="
    text-xs
    text-white/70
    ">
    {
      cartItems.length
    } items
    </p>

    </div>

    </div>

    <button
    onClick={
      onClose
    }
    >

    <XMarkIcon
    className="
    w-6
    h-6
    "/>

    </button>

    </div>

    {/* Free Delivery */}

    {total<499&&
    cartItems.length>0&&(

    <div
    className="
    bg-green-50
    px-4
    py-2
    text-sm
    text-green-700
    ">

    Add ₹
    {499-total}
    more for FREE delivery

    </div>

    )}

    {/* Products */}

    <div
    className="
    flex-1
    overflow-y-auto
    p-4
    space-y-4
    ">

    {cartItems.length===0?

    (

    <div
    className="
    h-full
    flex
    flex-col
    items-center
    justify-center
    ">

    <ShoppingCartIcon
    className="
    w-20
    h-20
    text-gray-300
    "/>

    <p>
    Cart Empty
    </p>

    </div>

    )

    :

    cartItems.map(
    item=>(

    <div
    key={item.id}

    className="
    flex
    gap-3
    p-3
    border
    rounded-xl
    ">

    <img
    src={
    item.image ||
    item.image_url ||
    "/placeholder-product.png"
    }

    className="
    w-24
    h-24
    object-cover
    rounded-lg
    "

    />

    <div
    className="
    flex-1
    ">

    <Link
    href={`/products/${item.id}`}
    >

    <h3
    className="
    font-semibold
    truncate
    ">
    {item.name}
    </h3>

    </Link>

    <p
    className="
    text-purple-600
    font-bold
    ">

    ₹
    {item.price}

    </p>

    <div
    className="
    flex
    justify-between
    mt-3
    ">

    <div
    className="
    flex
    border
    rounded
    ">

    <button
    onClick={()=>
    updateQuantity(
    item.id,
    (
    item.quantity||1
    )-1
    )
    }>
    <MinusIcon
    className="
    w-4
    "/>
    </button>

    <span
    className="
    px-2
    ">
    {
    item.quantity||1
    }
    </span>

    <button
    onClick={()=>
    updateQuantity(
    item.id,
    (
    item.quantity||1
    )+1
    )
    }>
    <PlusIcon
    className="
    w-4
    "/>
    </button>

    </div>

    <button
    onClick={()=>
    removeItem(
    item.id,
    item.name
    )
    }>

    <TrashIcon
    className="
    w-5
    text-red-500
    "/>

    </button>

    </div>

    </div>

    </div>

    ))}

    </div>

    {/* Footer */}

    {cartItems.length>0&&(

    <div
    className="
    border-t
    p-4
    bg-white
    ">

    <div
    className="
    flex
    gap-2
    mb-4
    ">

    <input

    value={
      couponCode
    }

    onChange={
    e=>
    setCouponCode(
    e.target.value
    .toUpperCase()
    )
    }

    placeholder="
    Coupon
    SAVE10"

    className="
    flex-1
    border
    px-3
    py-2
    rounded
    "
    />

    <button

    onClick={
    applyCoupon
    }

    className="
    bg-purple-600
    text-white
    px-4
    rounded
    "
    >

    Apply

    </button>

    </div>

    <div
    className="
    text-sm
    space-y-2
    ">

    <div
    className="
    flex
    justify-between
    ">
    <span>
    Subtotal
    </span>

    <span>
    ₹{total}
    </span>

    </div>

    {discount>0&&(

    <div
    className="
    flex
    justify-between
    text-green-600
    ">

    <span>
    Discount
    </span>

    <span>
    -₹
    {
    Math.round(
    discount
    )
    }
    </span>

    </div>

    )}

    <div
    className="
    flex
    justify-between
    ">

    <span>
    Delivery
    </span>

    <span>

    {
    deliveryCharge===0
    ?
    "FREE"
    :
    `₹${deliveryCharge}`
    }

    </span>

    </div>

    <div
    className="
    flex
    justify-between
    ">

    <span>
    GST
    </span>

    <span>
    ₹{
    Math.round(gst)
    }
    </span>

    </div>

    <hr/>

    <div
    className="
    flex
    justify-between
    font-bold
    text-xl
    ">

    <span>
    Total
    </span>

    <span>
    ₹{
    Math.round(
    finalTotal
    )
    }
    </span>

    </div>

    </div>

    <Link
    href="/checkout"

    onClick={
      onClose
    }

    className="
    mt-4
    flex
    justify-center
    items-center
    gap-2
    py-3
    rounded-xl
    text-white
    bg-gradient-to-r
    from-purple-600
    to-pink-600
    "
    >

    <CreditCardIcon
    className="
    w-5
    "/>

    Checkout

    </Link>

    </div>

    )}

    </motion.div>

    )}

    </AnimatePresence>
  </>
 )
}