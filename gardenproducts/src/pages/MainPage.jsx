import { useSelector } from "react-redux";
import CategoryContainer from "./../components/CategoriesComponents/categoryContainer/CategoryContainer";
import DiscountForm from "./../components/homeComponents/discountForm/DiscountForm";
import ProductContainer from "./../components/homeComponents/productComponent/productContainer/ProductContainer";
import Banner from "../components/Banner/Banner";

export default function MainPage() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`main_page ${theme}`}>
      <Banner />
      <div className="container">
        <CategoryContainer />
        <DiscountForm />
        <ProductContainer />
      </div>
    </div>
  );
}
