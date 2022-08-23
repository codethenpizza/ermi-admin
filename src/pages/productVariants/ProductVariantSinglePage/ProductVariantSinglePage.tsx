import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ProductVariant} from "@types";
import {productVariantService} from "@services/productVariant";
import {Card, Skeleton} from "antd";
import styles from './ProductVariantSinglePage.module.scss';
import {ProductVariantForm} from "@containers/productVariant/ProductVariantForm";
import {ProductVariantImageFormCard} from "@containers/productVariantImage/ProductVariantImageFormCard/ProductVariantImageFormCard";
import {AttrValueTable} from "@containers/attrValue/AttrValueTable";
import {OfferTable} from "@containers/offer/OfferTable";

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
                <OfferTable filters={{product_variant_id: [productVariant.id]}} />
            </Card>
        </div>
    )
}
