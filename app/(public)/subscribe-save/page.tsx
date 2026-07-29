import { getProducts } from "@/lib/products";
import SubscribeSaveClient from "./SubscribeSaveClient";

export default async function SubscribeSavePage() {
  const products = await getProducts();
  return <SubscribeSaveClient products={products} />;
}
