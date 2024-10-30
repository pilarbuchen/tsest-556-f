import { useCallback, useMemo } from 'react';
import {
    IProductFilters,
    productFiltersFromSearchParams,
    searchParamsFromProductFilters,
} from '~/lib/ecom';
import { RangeSlider } from '~/lib/components/range-slider/range-slider';
import { formatPrice, mergeUrlSearchParams } from '~/lib/utils';
import { useSearchParamsOptimistic } from '~/lib/hooks';
import { Accordion } from '../accordion/accordion';

interface ProductFiltersProps {
    lowestPrice: number;
    highestPrice: number;
    currency: string;
}

export const ProductFilters = ({ lowestPrice, highestPrice, currency }: ProductFiltersProps) => {
    const [searchParams, setSearchParams] = useSearchParamsOptimistic();

    const filters = useMemo(() => productFiltersFromSearchParams(searchParams), [searchParams]);

    const handleFiltersChange = (changed: Partial<IProductFilters>) => {
        const newParams = searchParamsFromProductFilters({ ...filters, ...changed });
        setSearchParams((params) => mergeUrlSearchParams(params, newParams), {
            preventScrollReset: true,
        });
    };

    const formatPriceValue = useCallback(
        (price: number) => formatPrice(price, currency),
        [currency],
    );

    return (
        <Accordion
            small
            items={[
                {
                    title: 'Price',
                    content: (
                        <RangeSlider
                            className="rangeSlider"
                            step="any"
                            startValue={filters.minPrice ?? lowestPrice}
                            endValue={filters.maxPrice ?? highestPrice}
                            onStartValueChange={(value) => {
                                handleFiltersChange({
                                    minPrice: Math.max(Math.floor(value), lowestPrice),
                                });
                            }}
                            onEndValueChange={(value) => {
                                handleFiltersChange({
                                    maxPrice: Math.min(Math.ceil(value), highestPrice),
                                });
                            }}
                            minValue={lowestPrice}
                            maxValue={highestPrice}
                            formatValue={formatPriceValue}
                        />
                    ),
                },
            ]}
        />
    );
};
