import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Product} from "@types";
import {productService} from "@services";
import {Card, Skeleton} from "antd";
import {ProductForm} from "@components/product/ProductForm";
import {ProductVariantTable} from "@components/productVariant/ProductVariantTable";

export const ProductSinglePage: FC = () => {
    const params = useParams();
    const id = parseInt(params.id || '');

    const [product, setProduct] = useState<Product | null>(null);


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
                <ProductVariantTable filters={{product_id: [id]}}/>
            </Card>
        </>
    );
}
