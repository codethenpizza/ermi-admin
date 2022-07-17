import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AUTH_ROUTES, Product, ProductVariant} from "@types";
import {productService} from "@services";
import {Card, Skeleton} from "antd";
import {composeRootTo} from "@utils";
import {ProductVariantTable} from "@containers/productVariant/ProductVariantTable";
import {ProductForm} from "@containers/product/ProductForm";

export const ProductSinglePage: FC = () => {
    const params = useParams();
    const id = parseInt(params.id || '');

    const [product, setProduct] = useState<Product | null>(null);

    const navigate = useNavigate();

    const handleRowClick = (item: ProductVariant) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.product_id.toString(), 'variant', item.id.toString()));
    }


    useEffect(() => {
        if (!isNaN(id)) {
            productService.fetchItem(id)
                .then(setProduct);
        }
    }, [id]);

    if (!product) {
        return <Skeleton/>;
    }

    return (
        <>
            <Card title={`Продукт ${product.name} (${product.uid})`}>
                <ProductForm product={product}/>
            </Card>
            <Card title="Список вариантов">
                <ProductVariantTable
                    filters={{product_id: [id]}}
                    onRow={(item) => ({
                        onClick: () => handleRowClick(item),
                    })}
                />
            </Card>
        </>
    );
}
