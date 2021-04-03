import Link from "next/link";
import Item from "./styles/ItemStyles";
import Title from "./styles/Title";

const Product = ({ product }) => {
  return (
    <Item>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
    </Item>
  );
};

export default Product;
