import { notFound } from "next/navigation";
import { getProducts, getRelatedProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, products);

  return <ProductDetailClient product={product} related={related} />;
}
