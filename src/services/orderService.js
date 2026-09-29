import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5050/orders";

export const createOrder = async ({
  items,
  shippingInfo,
  paymentMethod,
  totalAmount,
}) => {
  const token = getToken();

  const response = await axios.post(
    API_URL,
    {
      items,
      shippingInfo,
      paymentMethod,
      totalAmount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
  const token = getToken();

  const response = await axios.get(
    `${API_URL}/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};