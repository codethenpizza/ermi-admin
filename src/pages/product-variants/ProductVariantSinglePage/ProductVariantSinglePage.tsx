import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ProductVariant} from "@types";
import {productVariantService} from "@services/productVariant";
import {Card, Skeleton} from "antd";
import {ProductVariantForm} from "@components/productVariant/ProductVariantForm";
import {AttrValueTable} from "@components/attrValue/AttrValueTable";
import styles from './ProductVariantSinglePage.module.scss';
import {ProductVariantImageFormCard} from "@components/productVariantImage/ProductVariantImageFormCard/ProductVariantImageFormCard";
import {OfferList} from "@components/offer/OfferList";

export const ProductVariantSinglePage: FC = () => {
    const params = useParams();
    const id = parseInt(params.id || '');

    const [productVariant, setProductVariant] = useState<ProductVariant | null>(null);

    useEffect(() => {
        if (!isNaN(id)) {
            productVariantService.fetchItem(id)
                .then(setProductVariant);
        }
    }, [id]);


    if (!productVariant) {
        return <Skeleton/>;
    }

    return (
        <div className={styles.container}>
            <Card title={`Вариант продукта ${productVariant.name} (${productVariant.uid})`}>
                <ProductVariantForm productVariant={productVariant}/>
            </Card>
            <ProductVariantImageFormCard productVariant={productVariant} />
            <Card title="Атрибуты">
                <AttrValueTable filters={{product_variant_id: [productVariant.id]}}/>
            </Card>
            <Card title="Оферы">
                <OfferList filters={{product_variant_id: [productVariant.id]}} />
            </Card>
        </div>
    )
}
